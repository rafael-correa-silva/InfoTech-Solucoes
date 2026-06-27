/* =============================================
   InfoTech Soluções — form.js
   Validação de formulário | Envio via WhatsApp
   ============================================= */

'use strict';

const WA_NUMBER = '5534998111439';

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
    let msg = '';

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

  /* ---- Submit: valida e abre WhatsApp ---- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll('.form-control')];
    const allOk  = fields.map(validateField).every(Boolean);

    if (!allOk) {
      const firstError = form.querySelector('.form-control.error');
      firstError && firstError.focus();
      return;
    }

    /* Montar mensagem com os dados do formulário */
    const nome     = (form.querySelector('#name')    || {}).value || '';
    const telefone = (form.querySelector('#phone')   || {}).value || '';
    const email    = (form.querySelector('#email')   || {}).value || '';
    const servico  = (form.querySelector('#service') || {}).value || '';
    const mensagem = (form.querySelector('#message') || {}).value || '';

    const linhas = [
      'Olá! Vim pelo site da InfoTech Soluções e gostaria de solicitar um atendimento.',
      '',
      `*Nome:* ${nome}`,
    ];
    if (telefone) linhas.push(`*Telefone:* ${telefone}`);
    if (email)    linhas.push(`*E-mail:* ${email}`);
    if (servico)  linhas.push(`*Serviço:* ${servico}`);
    if (mensagem) linhas.push(`*Mensagem:* ${mensagem}`);

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    showSuccess();
  });

  /* ---- Exibir confirmação ---- */
  function showSuccess() {
    if (!successMsg || !formWrap) return;

    form.querySelectorAll('.form-group, .form-submit-row').forEach(el => {
      el.style.display = 'none';
    });

    successMsg.classList.add('show');
    successMsg.setAttribute('tabindex', '-1');
    successMsg.focus();

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