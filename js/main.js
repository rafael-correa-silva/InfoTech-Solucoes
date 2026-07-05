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
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Menu hambúrguer ---- */
function initMobileMenu() {
  const toggle   = document.querySelector('.menu-toggle');
  const menu     = document.querySelector('.mobile-menu');
  const overlay  = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const navLinks = document.querySelectorAll('.mobile-nav-list a');

  if (!toggle || !menu) return;

  const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { closeBtn && closeBtn.focus(); });
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }

  menu.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { closeMenu(); return; }
    if (e.key === 'Tab') {
      const focusable = [...menu.querySelectorAll(focusableSelectors)];
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  toggle.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());
  overlay  && overlay.addEventListener('click', closeMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* ---- Carrossel de depoimentos ---- */
function initCarousel() {
  const wrapper = document.querySelector('.carousel-wrapper');
  if (!wrapper) return;

  const track   = wrapper.querySelector('.carousel-track');
  const cards   = Array.from(wrapper.querySelectorAll('.testimonial-card'));
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const dotsEl  = document.querySelector('.carousel-dots');

  if (!track || cards.length === 0) return;

  /* Transformar o wrapper em scroll container */
  wrapper.style.overflowX = 'auto';
  wrapper.style.scrollSnapType = 'x mandatory';
  wrapper.style.scrollBehavior = 'smooth';
  wrapper.style.WebkitOverflowScrolling = 'touch';
  /* Esconder a barra de scroll visualmente */
  wrapper.style.msOverflowStyle  = 'none';
  wrapper.style.scrollbarWidth   = 'none';
  wrapper.classList.add('carousel-scroll');

  /* Cada card vira um snap point */
  cards.forEach(card => {
    card.style.scrollSnapAlign = 'start';
    card.style.flexShrink = '0';
  });

  /* Ajustar largura dos cards conforme breakpoint */
  function getPerView() {
    return window.innerWidth >= 768 ? 2 : 1;
  }

  function setCardWidths() {
    const perView = getPerView();
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    const w = perView === 1
      ? wrapper.clientWidth
      : (wrapper.clientWidth - gap) / 2;
    cards.forEach(card => {
      card.style.width = w + 'px';
    });
  }

  /* Índice do card mais à esquerda visível */
  function getCurrentIndex() {
    const wLeft = wrapper.getBoundingClientRect().left;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - wLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }

  /* Navegar para um card pelo índice */
  function goTo(index) {
    const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
    wrapper.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }

  function goNext() {
    const perView = getPerView();
    goTo(getCurrentIndex() + perView);
  }
  function goPrev() {
    const perView = getPerView();
    goTo(getCurrentIndex() - perView);
  }

  /* Dots — um por grupo de cards */
  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const perView = getPerView();
    const total = Math.ceil(cards.length / perView);
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i * perView));
      dotsEl.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsEl) return;
    const perView = getPerView();
    const current = Math.floor(getCurrentIndex() / perView);
    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  /* Atualizar dots ao fazer scroll */
  let scrollTimer;
  wrapper.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateDots, 80);
  }, { passive: true });

  /* Swipe touch (já coberto pelo scroll nativo, mas manter delta para compatibilidade) */
  let startX = 0;
  wrapper.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  wrapper.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  }, { passive: true });

  prevBtn && prevBtn.addEventListener('click', goPrev);
  nextBtn && nextBtn.addEventListener('click', goNext);

  /* Resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setCardWidths();
      buildDots();
      updateDots();
    }, 200);
  });

  /* Inicializar */
  setCardWidths();
  buildDots();
}

/* ---- Highlight do menu ativo ---- */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
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