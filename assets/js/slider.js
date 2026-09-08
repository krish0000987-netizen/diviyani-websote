/* ==========================================================================
   DEVYANI CREATIVE STUDIO — 3-SECOND CINEMATIC HERO SLIDESHOW
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});

function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-section');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const indicators = slider.querySelectorAll('.hero-indicator-btn');
  const counterCurrent = slider.querySelector('.hero-counter-current');
  const counterTotal = slider.querySelector('.hero-counter-total');

  if (!slides.length) return;

  let currentIdx = 0;
  const totalSlides = slides.length;
  const slideDuration = 3000; // 3 Seconds
  let slideInterval = null;
  let isPaused = false;

  if (counterTotal) {
    counterTotal.textContent = `0${totalSlides}`;
  }

  const updateSlide = (nextIdx) => {
    slides[currentIdx].classList.remove('is-active');
    if (indicators[currentIdx]) indicators[currentIdx].classList.remove('is-active');

    currentIdx = (nextIdx + totalSlides) % totalSlides;

    slides[currentIdx].classList.add('is-active');
    if (indicators[currentIdx]) indicators[currentIdx].classList.add('is-active');

    if (counterCurrent) {
      counterCurrent.textContent = `0${currentIdx + 1}`;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    slideInterval = setInterval(() => {
      if (!isPaused) {
        updateSlide(currentIdx + 1);
      }
    }, slideDuration);
  };

  const stopAutoplay = () => {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  };

  // Indicators click
  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      updateSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => { isPaused = true; });
  slider.addEventListener('mouseleave', () => { isPaused = false; });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      updateSlide(currentIdx + 1);
      startAutoplay();
    } else if (e.key === 'ArrowLeft') {
      updateSlide(currentIdx - 1);
      startAutoplay();
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      updateSlide(currentIdx + 1);
      startAutoplay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      updateSlide(currentIdx - 1);
      startAutoplay();
    }
  };

  // Initialize first slide & start
  updateSlide(0);
  startAutoplay();
}
