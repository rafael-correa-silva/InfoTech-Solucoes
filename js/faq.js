/* =============================================
   InfoTech Soluções — faq.js
   Accordion do FAQ com acessibilidade aria-expanded
   ============================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initFaq();
});

function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fechar todos os outros (accordion exclusivo)
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherBtn    = other.querySelector('.faq-question');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherBtn)    otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.setAttribute('hidden', '');
        }
      });

      // Alternar o atual
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) {
        answer.removeAttribute('hidden');
      } else {
        answer.setAttribute('hidden', '');
      }
    });

    // Estado inicial: fechado
    btn.setAttribute('aria-expanded', 'false');
    answer.setAttribute('hidden', '');
  });
}
