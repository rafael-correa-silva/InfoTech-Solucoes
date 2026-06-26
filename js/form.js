/* =============================================
   InfoTech Soluções — form.js
   Validação de formulário | Feedback visual
   ============================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form       = document.querySelector('#contact-form');
  const formWrap   = document.querySelector('.contact-form');
  const successMsg = document.querySelector('.form-success');

  if (!form) return;

  /* ---- Formatação automática do telefone ---- */
  const phoneInput = form.querySelector('#phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let v = phoneInput.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
      }
      phoneInput.value = v;
    });
  }

  /* ---- Validação de campo individual ---- */
  function validateField(field) {
    const group = field.closest('.form-group');
    const error = group ? group.querySelector('.form-error') : null;
    let msg     = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      msg = 'Este campo é obrigatório.';
    } else if (field.type === 'email' && field.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        msg = 'Informe um e-mail válido.';
      }
    } else if (field.id === 'phone' && field.value.trim()) {
      const digits = field.value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        msg = 'Informe um telefone válido, ex: (34) 99999-0000.';
      }
    } else if (field.tagName === 'SELECT' && field.value === '') {
      msg = 'Selecione um tipo de serviço.';
    }

    if (group) {
      group.classList.toggle('has-error', !!msg);
      field.classList.toggle('error', !!msg);
    }
    if (error) error.textContent = msg;

    return !msg;
  }

  /* ---- Validação ao sair do campo ---- */
  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  /* ---- Submit ---- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields  = [...form.querySelectorAll('.form-control')];
    const allOk   = fields.map(validateField).every(Boolean);

    if (!allOk) {
      // Focar no primeiro campo com erro
      const firstError = form.querySelector('.form-control.error');
      firstError && firstError.focus();
      return;
    }

    /* --- Simular envio (substituir pelo endpoint real futuramente) ---
     *
     * Para integrar com Formspree:
     * 1. Crie uma conta em https://formspree.io
     * 2. Adicione o atributo ao <form>: action="https://formspree.io/f/SEU_ID" method="POST"
     * 3. Remova o e.preventDefault() acima (ou use fetch abaixo)
     *
     * Para fetch (AJAX):
     * const data = new FormData(form);
     * fetch('https://formspree.io/f/SEU_ID', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
     *   .then(r => r.ok ? showSuccess() : alert('Erro ao enviar. Tente novamente.'))
     *   .catch(() => alert('Erro de conexão.'));
     */

    showSuccess();
  });

  function showSuccess() {
    if (!successMsg || !formWrap) return;

    // Esconder campos
    form.querySelectorAll('.form-group, .form-submit-row').forEach(el => {
      el.style.display = 'none';
    });

    successMsg.classList.add('show');
    successMsg.setAttribute('tabindex', '-1');
    successMsg.focus();

    // Restaurar após 6 segundos
    setTimeout(() => {
      successMsg.classList.remove('show');
      form.reset();
      form.querySelectorAll('.form-group, .form-submit-row').forEach(el => {
        el.style.display = '';
      });
      form.querySelectorAll('.form-control').forEach(f => {
        f.classList.remove('error');
        const g = f.closest('.form-group');
        g && g.classList.remove('has-error');
      });
    }, 6000);
  }
}
