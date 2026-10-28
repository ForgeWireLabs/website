import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../src/assets/homepage-carousel.js", import.meta.url), "utf8");

class FakeElement {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.attributes = new Map();
    this.listeners = new Map();
    this.classes = new Set();
    this.inert = false;
    this.hidden = true;
    this.focusVisible = false;
    this.classList = {
      add: name => this.classes.add(name),
      toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name),
    };
  }
  addEventListener(name, listener) {
    const list = this.listeners.get(name) ?? [];
    list.push(listener);
    this.listeners.set(name, list);
  }
  emit(name, event = {}) {
    const fullEvent = { target: this, preventDefault() {}, ...event };
    for (const listener of this.listeners.get(name) ?? []) listener(fullEvent);
    return fullEvent;
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  matches(selector) { return selector === ":focus-visible" && this.focusVisible; }
  contains(node) { return node === this || node === surface; }
  getBoundingClientRect() { return { left: 0, width: 300 }; }
}

let surface;

function fixture() {
  let now = 0;
  let nextTimer = 1;
  const timers = new Map();
  const slides = Array.from({ length: 4 }, () => new FakeElement());
  const indicators = Array.from({ length: 4 }, (_, index) => new FakeElement({ carouselSlideTo: String(index) }));
  indicators.forEach((indicator, index) => indicator.setAttribute("aria-label", `Show slide ${index + 1}: Slide ${index + 1}`));
  const controls = new FakeElement();
  surface = new FakeElement();
  const carousel = new FakeElement();
  carousel.querySelector = selector => selector === "[data-carousel-surface]" ? surface : controls;
  carousel.querySelectorAll = selector => selector === "[data-slide]" ? slides : indicators;
  let activeElement = null;
  const documentListeners = new Map();
  const document = {
    hidden: false,
    get activeElement() { return activeElement; },
    set activeElement(value) { activeElement = value; },
    querySelector: () => carousel,
    addEventListener(name, listener) { documentListeners.set(name, listener); },
    emit(name, event = {}) { documentListeners.get(name)?.(event); },
  };
  const mediaListeners = new Set();
  const media = {
    matches: false,
    addEventListener(_name, listener) { mediaListeners.add(listener); },
    change(matches) { this.matches = matches; for (const listener of mediaListeners) listener({ matches }); },
  };
  const window = {
    matchMedia: () => media,
    clearTimeout(id) { timers.delete(id); },
    setTimeout(callback, delay = 0) {
      const id = nextTimer++;
      timers.set(id, { callback, at: now + Math.max(0, delay) });
      return id;
    },
  };
  class TestDate extends Date { static now() { return now; } }
  vm.runInNewContext(source, { document, window, Date: TestDate });
  const activeIndex = () => slides.findIndex(slide => slide.getAttribute("aria-hidden") === "false");
  const tick = duration => {
    const end = now + duration;
    while (true) {
      const due = [...timers.entries()].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!due) break;
      const [id, timer] = due;
      timers.delete(id);
      now = timer.at;
      timer.callback();
    }
    now = end;
  };
  const clickAt = x => surface.emit("click", { clientX: x, clientY: 20, detail: 1, pointerId: 1 });
  const swipe = (id, fromX, toX, fromY = 20, toY = 20) => {
    surface.emit("pointerdown", { pointerId: id, pointerType: "touch", isPrimary: true, button: 0, clientX: fromX, clientY: fromY });
    surface.emit("pointerup", { pointerId: id, pointerType: "touch", isPrimary: true, button: 0, clientX: toX, clientY: toY });
  };
  return { carousel, controls, document, indicators, media, slides, surface, activeIndex, tick, clickAt, swipe };
}

test("autoplay advances after 20 seconds and center hold lasts 60 seconds, resetting on repeat", () => {
  const f = fixture();
  f.tick(19_999);
  assert.equal(f.activeIndex(), 0);
  f.tick(1);
  assert.equal(f.activeIndex(), 1);

  f.clickAt(150);
  f.tick(59_000);
  assert.equal(f.activeIndex(), 1);
  f.clickAt(150);
  f.tick(59_999);
  assert.equal(f.activeIndex(), 1);
  f.tick(1);
  assert.equal(f.activeIndex(), 2);
});

test("edge, swipe and dot navigation clear a hold and restart a complete 20-second interval", () => {
  const f = fixture();
  f.clickAt(150);
  f.tick(40_000);
  f.clickAt(280);
  assert.equal(f.activeIndex(), 1);
  f.tick(19_999);
  assert.equal(f.activeIndex(), 1);
  f.tick(1);
  assert.equal(f.activeIndex(), 2);

  f.clickAt(150);
  f.indicators[3].emit("click");
  assert.equal(f.activeIndex(), 3);
  f.tick(19_999);
  assert.equal(f.activeIndex(), 3);
  f.tick(1);
  assert.equal(f.activeIndex(), 0);

  f.clickAt(150);
  f.swipe(8, 280, 20);
  assert.equal(f.activeIndex(), 1);
  f.tick(19_999);
  assert.equal(f.activeIndex(), 1);
  f.tick(1);
  assert.equal(f.activeIndex(), 2);
});

test("swipes suppress delayed clicks while rapid gestures and vertical movement stay usable", () => {
  const f = fixture();
  f.swipe(1, 280, 20);
  assert.equal(f.activeIndex(), 1);
  f.tick(100);
  f.surface.emit("click", { clientX: 20, clientY: 20, detail: 1, pointerId: 1 });
  assert.equal(f.activeIndex(), 1);
  f.swipe(2, 280, 20);
  assert.equal(f.activeIndex(), 2);
  f.surface.emit("pointerdown", { pointerId: 4, pointerType: "touch", isPrimary: true, button: 0, clientX: 20, clientY: 20 });
  f.surface.emit("pointercancel", { pointerId: 4, pointerType: "touch", isPrimary: true, clientX: 20, clientY: 20 });
  assert.equal(f.activeIndex(), 2, "canceled gestures do not navigate");
  f.tick(100);
  f.surface.emit("click", { clientX: 20, clientY: 20, detail: 1 });
  assert.equal(f.activeIndex(), 2, "cancellation-generated click is suppressed");
  f.clickAt(280);
  assert.equal(f.activeIndex(), 3, "a new click after cancellation still works");
  f.swipe(3, 150, 155, 20, 120);
  assert.equal(f.activeIndex(), 3);
});

test("hover, focus, hidden document, and reduced-motion changes suspend autoplay", () => {
  const f = fixture();
  f.tick(10_000);
  f.carousel.emit("pointerenter", { pointerType: "mouse" });
  f.tick(30_000);
  assert.equal(f.activeIndex(), 0);
  f.carousel.emit("pointerleave", { pointerType: "mouse" });
  f.tick(19_999);
  assert.equal(f.activeIndex(), 0);
  f.tick(1);
  assert.equal(f.activeIndex(), 1);

  f.document.hidden = true;
  f.document.emit("visibilitychange");
  f.tick(60_000);
  assert.equal(f.activeIndex(), 1);
  f.document.hidden = false;
  f.document.emit("visibilitychange");
  f.tick(20_000);
  assert.equal(f.activeIndex(), 2);

  f.media.change(true);
  f.tick(60_000);
  assert.equal(f.activeIndex(), 2);
  f.media.change(false);
  f.tick(20_000);
  assert.equal(f.activeIndex(), 3);
});

test("active slide semantics, indicator names, and keyboard navigation stay stable", () => {
  const f = fixture();
  assert.deepEqual(f.slides.map(slide => [slide.getAttribute("aria-hidden"), slide.inert]), [
    ["false", false], ["true", true], ["true", true], ["true", true],
  ]);
  assert.deepEqual(f.indicators.map(dot => dot.getAttribute("aria-pressed")), ["true", "false", "false", "false"]);
  assert.equal(new Set(f.indicators.map(dot => dot.getAttribute("aria-label"))).size, 4);
  f.carousel.emit("keydown", { target: f.surface, key: "ArrowRight" });
  assert.equal(f.activeIndex(), 1);
  f.tick(60_000);
  assert.equal(f.activeIndex(), 1, "keyboard navigation keeps autoplay suspended while focused");
  f.carousel.emit("keydown", { target: f.surface, key: "ArrowLeft" });
  assert.equal(f.activeIndex(), 0);
  assert.match(f.surface.getAttribute("aria-label"), /one minute/);
});
