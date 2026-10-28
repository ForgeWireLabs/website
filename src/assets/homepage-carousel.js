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
  let skipSynthesizedClick = false;

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
    if (!event.isPrimary) return;
    downPoint = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }, { passive: true });
  surface.addEventListener("pointerup", (event) => {
    if (!downPoint || event.pointerId !== downPoint.id) return;
    const dx = event.clientX - downPoint.x;
    const dy = event.clientY - downPoint.y;
    downPoint = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.35) {
      skipSynthesizedClick = true;
      manualAction(activeIndex + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  surface.addEventListener("pointercancel", () => { downPoint = null; }, { passive: true });
  surface.addEventListener("click", (event) => {
    if (skipSynthesizedClick) {
      skipSynthesizedClick = false;
      return;
    }
    const box = surface.getBoundingClientRect();
    if (!box.width) return;
    const relativeX = (event.clientX - box.left) / box.width;
    if (relativeX < 0.34) manualAction(activeIndex - 1);
    else if (relativeX > 0.66) manualAction(activeIndex + 1);
    else manualAction();
  });

  // Focused keyboard users can read a slide without an unexpected transition.
  surface.addEventListener("keydown", (event) => {
    if (event.target !== surface) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      keyboardFocus = true;
      manualAction(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
    } else if (event.key === " " || event.key === "Enter") {
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
