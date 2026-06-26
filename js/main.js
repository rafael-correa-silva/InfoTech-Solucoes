/* =============================================
   InfoTech Soluções — main.js
   Menu hambúrguer | Header scroll | Carrossel | WhatsApp
   ============================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initCarousel();
  initNavHighlight();
  initLogoFallback();
});

/* ---- Logo fallback ---- */
function initLogoFallback() {
  document.querySelectorAll('img[data-logo]').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = img.nextElementSibling;
      if (fallback && fallback.classList.contains('logo-fallback')) {
        img.style.display = 'none';
        fallback.style.display = 'block';
      }
    });
  });
}

/* ---- Header dinâmico ---- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Menu hambúrguer ---- */
function initMobileMenu() {
  const toggle    = document.querySelector('.menu-toggle');
  const menu      = document.querySelector('.mobile-menu');
  const overlay   = document.querySelector('.mobile-menu-overlay');
  const closeBtn  = document.querySelector('.mobile-menu-close');
  const navLinks  = document.querySelectorAll('.mobile-nav-list a');

  if (!toggle || !menu) return;

  const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Foco no botão de fechar
    requestAnimationFrame(() => {
      closeBtn && closeBtn.focus();
    });
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }

  // Trap de foco dentro do menu
  menu.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = [...menu.querySelectorAll(focusableSelectors)];
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  toggle.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay && overlay.addEventListener('click', closeMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---- Carrossel de depoimentos ---- */
function initCarousel() {
  const wrapper = document.querySelector('.carousel-wrapper');
  if (!wrapper) return;

  const track   = wrapper.querySelector('.carousel-track');
  const cards   = wrapper.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const dotsEl  = document.querySelector('.carousel-dots');

  if (!track || cards.length === 0) return;

  let current  = 0;
  let perView  = getPerView();
  let total    = Math.ceil(cards.length / perView);
  let startX   = 0;
  let isDragging = false;

  // Criar dots
  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function getPerView() {
    return window.innerWidth >= 768 ? 2 : 1;
  }

  function updateTrack() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap       = parseFloat(getComputedStyle(track).gap) || 16;
    const offset    = current * (cardWidth + gap) * perView;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function updateDots() {
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    updateTrack();
    updateDots();
  }

  function goNext() { goTo(current < total - 1 ? current + 1 : 0); }
  function goPrev() { goTo(current > 0 ? current - 1 : total - 1); }

  prevBtn && prevBtn.addEventListener('click', goPrev);
  nextBtn && nextBtn.addEventListener('click', goNext);

  // Swipe touch
  track.addEventListener('touchstart', (e) => {
    startX    = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    isDragging = false;
  }, { passive: true });

  // Recalcular em resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newPer = getPerView();
      if (newPer !== perView) {
        perView = newPer;
        total   = Math.ceil(cards.length / perView);
        current = 0;
        buildDots();
      }
      updateTrack();
    }, 200);
  });

  buildDots();
  updateTrack();
}

/* ---- Highlight do menu ativo ---- */
function initNavHighlight() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-list a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}
