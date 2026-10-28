(() => {
  const carousel = document.querySelector("[data-home-carousel]");
  if (!carousel) return;

  const surface = carousel.querySelector("[data-carousel-surface]");
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const controls = carousel.querySelector("[data-carousel-controls]");
  const indicators = Array.from(carousel.querySelectorAll("[data-carousel-slide-to]"));
  if (!surface || !controls || slides.length !== 4 || indicators.length !== slides.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rotationDelay = 20_000;
  const interactionPause = 30_000;
  let activeIndex = 0;
  let pausedUntil = 0;
  let keyboardFocus = false;
  let rotationTimer;
  let downPoint = null;
  let suppressedClick = null;

  function render() {
    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
    });
    indicators.forEach((indicator, index) => {
      indicator.setAttribute("aria-pressed", String(index === activeIndex));
    });
  }

  function scheduleRotation() {
    window.clearTimeout(rotationTimer);
    if (document.hidden || reducedMotion.matches || keyboardFocus) return;
    const remainingPause = pausedUntil - Date.now();
    const delay = remainingPause > 0 ? remainingPause : rotationDelay;
    rotationTimer = window.setTimeout(() => showSlide(activeIndex + 1), delay);
  }

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    render();
    scheduleRotation();
  }

  function manualAction(index) {
    pausedUntil = Date.now() + interactionPause;
    if (Number.isInteger(index)) showSlide(index);
    else scheduleRotation();
  }

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      manualAction(Number(indicator.dataset.carouselSlideTo));
    });
  });

  // The left/right thirds navigate; the center pauses for 30 seconds.
  // Swiping never blocks the browser's normal vertical scrolling.
  surface.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    // A new gesture must remain usable even if the previous swipe had no click.
    if (suppressedClick) {
      if (suppressedClick.id === event.pointerId) suppressedClick = null;
      else suppressedClick.allowFallback = false;
    }
    downPoint = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }, { passive: true });
  surface.addEventListener("pointerup", (event) => {
    if (!downPoint || event.pointerId !== downPoint.id) return;
    const dx = event.clientX - downPoint.x;
    const dy = event.clientY - downPoint.y;
    downPoint = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.35) {
      suppressedClick = { id: event.pointerId, x: event.clientX, y: event.clientY, time: Date.now(), allowFallback: true };
      manualAction(activeIndex + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  surface.addEventListener("pointercancel", (event) => {
    if (!downPoint || event.pointerId !== downPoint.id) return;
    suppressedClick = { id: event.pointerId, x: event.clientX, y: event.clientY, time: Date.now(), allowFallback: true };
    downPoint = null;
  }, { passive: true });
  surface.addEventListener("click", (event) => {
    if (suppressedClick) {
      const recent = Date.now() - suppressedClick.time < 1000;
      const hasPointerId = typeof event.pointerId === "number" && event.pointerId > 0;
      const samePointer = hasPointerId && event.pointerId === suppressedClick.id;
      const nearEnd = Math.abs(event.clientX - suppressedClick.x) < 25 && Math.abs(event.clientY - suppressedClick.y) < 25;
      const fallbackMatch = !hasPointerId && suppressedClick.allowFallback && event.detail !== 0 && nearEnd;
      if (recent && (samePointer || fallbackMatch)) {
        suppressedClick = null;
        return;
      }
      if (!recent) suppressedClick = null;
    }
    const box = surface.getBoundingClientRect();
    if (!box.width) return;
    const relativeX = (event.clientX - box.left) / box.width;
    if (relativeX < 0.34) manualAction(activeIndex - 1);
    else if (relativeX > 0.66) manualAction(activeIndex + 1);
    else manualAction();
  });

  // Focused keyboard users can read a slide without an unexpected transition.
  carousel.addEventListener("keydown", (event) => {
    if (event.target !== surface && !indicators.includes(event.target)) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      keyboardFocus = true;
      manualAction(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
    } else if (event.target === surface && (event.key === " " || event.key === "Enter")) {
      event.preventDefault();
      keyboardFocus = true;
      manualAction();
    }
  });
  carousel.addEventListener("focusin", (event) => {
    if (event.target.matches(":focus-visible")) keyboardFocus = true;
    scheduleRotation();
  });
  carousel.addEventListener("focusout", () => {
    window.setTimeout(() => {
      keyboardFocus = !!(carousel.contains(document.activeElement) && document.activeElement.matches(":focus-visible"));
      scheduleRotation();
    }, 0);
  });
  document.addEventListener("visibilitychange", scheduleRotation);
  reducedMotion.addEventListener("change", scheduleRotation);

  carousel.classList.add("is-enhanced");
  surface.tabIndex = 0;
  surface.setAttribute("aria-label", "Slide image: tap left for previous, right for next, or center to pause for 30 seconds. Swipe left or right to navigate. Use left and right arrow keys when focused.");
  controls.hidden = false;
  render();
  scheduleRotation();
})();
