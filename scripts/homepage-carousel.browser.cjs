const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const baseUrl = process.env.HOMEPAGE_URL || 'http://127.0.0.1:18108/';
const edgePath = process.env.EDGE_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const results = [];
const record = (name, detail) => results.push({ name, detail });
const active = async page => Number((await page.locator('[data-slide].is-active').getAttribute('aria-label')).split(' ')[0]);

async function newClockPage(browser, options = {}) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, ...options });
  const page = await context.newPage();
  await page.clock.install({ time: new Date('2026-10-28T12:00:00Z') });
  await page.addInitScript(() => {
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.__carouselTimers = [];
    window.setTimeout = (callback, delay = 0, ...args) => {
      const id = nativeSetTimeout(callback, delay, ...args);
      window.__carouselTimers.push({ delay, at: Date.now() + Number(delay || 0) });
      return id;
    };
  });
  await page.goto(baseUrl, { waitUntil: 'load' });
  return { context, page, surface: page.locator('[data-carousel-surface]') };
}

async function point(surface, fraction) {
  const box = await surface.boundingBox();
  return { x: box.x + box.width * fraction, y: box.y + box.height / 2 };
}

async function clickZone(page, surface, fraction) {
  const p = await point(surface, fraction);
  await page.mouse.click(p.x, p.y);
  await page.mouse.move(8, page.viewportSize().height - 8);
}

async function touchSwipe(cdp, x1, y1, x2, y2, id = 7) {
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x1, y: y1, id }] });
  for (let step = 1; step <= 5; step++) {
    await new Promise(resolve => setTimeout(resolve, 35));
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: x1 + (x2 - x1) * step / 5, y: y1 + (y2 - y1) * step / 5, id }],
    });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await new Promise(resolve => setTimeout(resolve, 150));
}

(async () => {
  const browser = await chromium.launch({ executablePath: edgePath, headless: true });
  try {
    {
      const { context, page, surface } = await newClockPage(browser);
      await page.mouse.move(8, page.viewportSize().height - 8);
      const initialTimer = await page.evaluate(() => {
        const now = Date.now();
        const scheduled = window.__carouselTimers.filter(timer => timer.delay === 20_000).at(-1);
        return { now, due: scheduled?.at };
      });
      assert.ok(Number.isFinite(initialTimer.due), 'a 20-second timer was scheduled initially');
      const untilInitialAdvance = initialTimer.due - initialTimer.now;
      assert.ok(untilInitialAdvance > 0 && untilInitialAdvance <= 20_000);
      await page.clock.fastForward(Math.max(0, untilInitialAdvance - 500)); assert.equal(await active(page), 1);
      await page.clock.fastForward(500); assert.equal(await active(page), 2);
      await clickZone(page, surface, .5);
      await page.clock.fastForward(30_000); assert.equal(await active(page), 2);
      await clickZone(page, surface, .5); // reset the full hold
      await page.clock.fastForward(59_500); assert.equal(await active(page), 2);
      await page.clock.fastForward(500); assert.equal(await active(page), 3);
      await clickZone(page, surface, .5);
      await page.clock.fastForward(30_000);
      await clickZone(page, surface, .85); assert.equal(await active(page), 4);
      await page.clock.fastForward(19_500); assert.equal(await active(page), 4);
      await page.clock.fastForward(500); assert.equal(await active(page), 1);
      await clickZone(page, surface, .5);
      await page.locator('[data-carousel-slide-to="2"]').click(); assert.equal(await active(page), 3);
      await page.mouse.move(8, page.viewportSize().height - 8);
      await page.clock.fastForward(19_500); assert.equal(await active(page), 3);
      await page.clock.fastForward(500); assert.equal(await active(page), 4);
      record('clocked rotation', '20 s initial interval; 60 s center hold; repeated hold resets; edge and dot navigation clear hold and restart full 20 s interval');
      await context.close();
    }

    {
      const { context, page, surface } = await newClockPage(browser, { hasTouch: true, isMobile: true });
      const box = await surface.boundingBox();
      const cdp = await context.newCDPSession(page);
      await clickZone(page, surface, .5); // establish a timed hold before a real swipe clears it
      await touchSwipe(cdp, box.x + box.width * .8, box.y + box.height / 2, box.x + box.width * .2, box.y + box.height / 2);
      assert.equal(await active(page), 2, 'left swipe advances exactly once');
      await page.clock.fastForward(100);
      await surface.dispatchEvent('click', { clientX: box.x + box.width * .2, clientY: box.y + box.height / 2, detail: 1 });
      assert.equal(await active(page), 2, 'delayed synthesized click after swipe is suppressed');
      await page.clock.fastForward(19_500); assert.equal(await active(page), 2);
      await page.clock.fastForward(500); assert.equal(await active(page), 3, 'swipe restarts full 20 s interval');
      await touchSwipe(cdp, box.x + box.width * .2, box.y + box.height / 2, box.x + box.width * .8, box.y + box.height / 2);
      assert.equal(await active(page), 2, 'right swipe moves back exactly once');
      await touchSwipe(cdp, box.x + box.width * .8, box.y + box.height / 2, box.x + box.width * .2, box.y + box.height / 2, 8);
      assert.equal(await active(page), 3, 'rapid second swipe moves once without reusing the first swipe click');
      const dot = page.locator('[data-carousel-slide-to="3"]');
      await dot.click(); assert.equal(await active(page), 4, 'dot selects slide and clears any hold');
      const beforeScroll = await page.evaluate(() => window.scrollY);
      await touchSwipe(cdp, box.x + box.width / 2, box.y + box.height * .85, box.x + box.width / 2, box.y + box.height * .2, 9);
      const afterScroll = await page.evaluate(() => window.scrollY);
      assert.ok(afterScroll > beforeScroll + 10, `vertical touch scroll: ${beforeScroll} to ${afterScroll}`);
      assert.equal(await active(page), 4, 'vertical scroll does not navigate');
      record('real touch input', `left/right swipes, delayed synthetic-click suppression, navigation interval, dot selection and vertical page scrolling (${beforeScroll} to ${afterScroll} px)`);
      await context.close();
    }

    {
      const { context, page } = await newClockPage(browser);
      await page.mouse.move(8, page.viewportSize().height - 8);
      const hoverPoint = await point(page.locator('[data-carousel-surface]'), .5);
      await page.mouse.move(hoverPoint.x, hoverPoint.y);
      await page.clock.fastForward(60_000);
      assert.equal(await active(page), 1, 'pointer hover suspends autoplay');
      await page.mouse.move(8, page.viewportSize().height - 8);
      await page.clock.fastForward(19_500); assert.equal(await active(page), 1);
      await page.clock.fastForward(500); assert.equal(await active(page), 2, 'rotation resumes after pointer leaves');

      await page.evaluate(() => Object.defineProperty(document, 'hidden', { configurable: true, value: true }));
      await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
      await page.clock.fastForward(60_000); assert.equal(await active(page), 2, 'hidden document suspends autoplay');
      await page.evaluate(() => Object.defineProperty(document, 'hidden', { configurable: true, value: false }));
      await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
      await page.clock.fastForward(20_000); assert.equal(await active(page), 3, 'visible document restarts a full interval');

      await page.evaluate(() => {
        window.__motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        window.__motionEvents = 0;
        window.__motionQuery.addEventListener('change', () => window.__motionEvents++);
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await new Promise(resolve => setTimeout(resolve, 100));
      assert.equal(await page.evaluate(() => window.__motionEvents), 1, 'runtime reduced-motion change event is delivered');
      await page.clock.fastForward(60_000); assert.equal(await active(page), 3, 'runtime reduced-motion change suspends autoplay');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await new Promise(resolve => setTimeout(resolve, 100));
      assert.equal(await page.evaluate(() => window.__motionEvents), 2, 'runtime reduced-motion clear event is delivered');
      await page.clock.fastForward(19_500); assert.equal(await active(page), 3);
      await page.clock.fastForward(500); assert.equal(await active(page), 4, 'clearing reduced-motion resumes rotation');
      record('hover, visibility and preference changes', 'hover and hidden document suspend; leaving/showing restarts full interval; runtime reduced-motion changes suspend and resume');
      await context.close();
    }

    {
      const { context, page, surface } = await newClockPage(browser);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 20 && !(await surface.evaluate(el => document.activeElement === el)); i++) await page.keyboard.press('Tab');
      assert.equal(await surface.evaluate(el => document.activeElement === el), true, 'carousel surface is keyboard reachable');
      assert.equal(await surface.evaluate(el => el.matches(':focus-visible')), true, 'keyboard focus remains visible');
      await page.keyboard.press('ArrowRight'); assert.equal(await active(page), 2);
      await page.clock.fastForward(60_000); assert.equal(await active(page), 2, 'keyboard focus suspends autoplay');
      await surface.evaluate(el => el.blur());
      await page.clock.fastForward(0);
      await page.clock.fastForward(19_500); assert.equal(await active(page), 2);
      await page.clock.fastForward(500); assert.equal(await active(page), 3, 'leaving keyboard focus restarts the interval');
      const dotLabels = await page.locator('[data-carousel-slide-to]').evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-label')));
      assert.equal(new Set(dotLabels).size, 4);
      const states = await page.locator('[data-slide]').evaluateAll(nodes => nodes.map(node => [node.getAttribute('aria-hidden'), node.inert]));
      assert.deepEqual(states, [['true', true], ['true', true], ['false', false], ['true', true]]);
      record('keyboard and accessibility state', 'visible stable focus, arrow navigation, focus suspension, four distinct dot labels and inactive slides aria-hidden/inert');
      await context.close();
    }

    {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(baseUrl);
      assert.equal(await page.locator('[data-slide]').count(), 4);
      for (const slide of await page.locator('[data-slide]').all()) assert.equal(await slide.isVisible(), true);
      assert.equal(await page.locator('[data-carousel-controls]').isVisible(), false);
      assert.equal(await page.locator('.exploration-card').count(), 3);
      record('no-JavaScript fallback', 'all four slides remain visible in reading order; dots hidden; three destination links remain navigable');
      await context.close();
    }

    console.log(JSON.stringify({ browser: 'isolated headless Microsoft Edge/Chromium', results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
