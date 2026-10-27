(() => {
  const carousel = document.querySelector("[data-home-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const controls = carousel.querySelector("[data-carousel-controls]");
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");
  const toggle = carousel.querySelector("[data-carousel-toggle]");
  const indicators = Array.from(carousel.querySelectorAll("[data-carousel-slide-to]"));
  if (slides.length !== 4 || !controls || !previous || !next || !toggle || indicators.length !== slides.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rotationDelay = 20_000;
  let activeIndex = 0;
  let rotationEnabled = !reducedMotion.matches;
  let pointerOverCarousel = false;
  let focusWithinCarousel = false;
  let rotationTimer;

  function updateControls() {
    indicators.forEach((indicator, index) => {
      indicator.setAttribute("aria-pressed", String(index === activeIndex));
    });
    toggle.setAttribute("aria-pressed", String(!rotationEnabled));
    toggle.setAttribute("aria-label", rotationEnabled ? "Pause automatic slide changes" : "Play automatic slide changes");
    toggle.textContent = rotationEnabled ? "Pause" : "Play";
  }

  function showSlide(index, manual = false) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
    });
    if (manual) rotationEnabled = false;
    updateControls();
    scheduleRotation();
  }

  function scheduleRotation() {
    window.clearTimeout(rotationTimer);
    if (!rotationEnabled || pointerOverCarousel || focusWithinCarousel || document.hidden) return;
    rotationTimer = window.setTimeout(() => {
      showSlide(activeIndex + 1);
    }, rotationDelay);
  }

  previous.addEventListener("click", () => showSlide(activeIndex - 1, true));
  next.addEventListener("click", () => showSlide(activeIndex + 1, true));
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => showSlide(Number(indicator.dataset.carouselSlideTo), true));
  });
  toggle.addEventListener("click", () => {
    rotationEnabled = !rotationEnabled;
    updateControls();
    scheduleRotation();
  });

  carousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-carousel-toggle]")) return;
    rotationEnabled = false;
    updateControls();
    scheduleRotation();
  }, { passive: true });
  carousel.addEventListener("pointerenter", () => {
    pointerOverCarousel = true;
    scheduleRotation();
  });
  carousel.addEventListener("pointerleave", () => {
    pointerOverCarousel = false;
    scheduleRotation();
  });
  carousel.addEventListener("focusin", () => {
    focusWithinCarousel = true;
    scheduleRotation();
  });
  carousel.addEventListener("focusout", () => {
    window.setTimeout(() => {
      focusWithinCarousel = carousel.contains(document.activeElement);
      scheduleRotation();
    }, 0);
  });
  document.addEventListener("visibilitychange", scheduleRotation);
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) rotationEnabled = false;
    updateControls();
    scheduleRotation();
  });

  carousel.classList.add("is-enhanced");
  controls.hidden = false;
  showSlide(0);
})();
