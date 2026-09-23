(function () {
  'use strict';

  var WHATSAPP_NUMBER = '56979282151';
  var DEFAULT_MESSAGE = 'Hola! Quiero reservar una hora 💇‍♀️';

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message || DEFAULT_MESSAGE);
  }

  document.querySelectorAll('.js-wa-link').forEach(function (el) {
    el.setAttribute('href', waLink(el.dataset.waMessage));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // ---------- Nav: transparente -> sólido al hacer scroll ----------
  var nav = document.getElementById('nav');
  function updateNav() {
    if (window.scrollY > 24) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // ---------- Comparador antes/después (galería) ----------
  document.querySelectorAll('.js-compare-range').forEach(function (input) {
    var container = input.closest('.compare');
    if (!container) return;
    function update() { container.style.setProperty('--pos', input.value + '%'); }
    input.addEventListener('input', update);
    update();
  });

  // ---------- Botón flotante WhatsApp: en mobile/tablet aparece tras el hero ----------
  var waFloat = document.querySelector('.wa-float');
  var heroEl = document.querySelector('.hero');
  var narrowQuery = window.matchMedia('(max-width: 900px)');
  function updateWaFloat() {
    if (!waFloat || !heroEl) return;
    if (!narrowQuery.matches) {
      waFloat.classList.remove('wa-float--hidden');
      return;
    }
    var heroBottom = heroEl.getBoundingClientRect().bottom + window.scrollY;
    if (window.scrollY > heroBottom - 200) {
      waFloat.classList.remove('wa-float--hidden');
    } else {
      waFloat.classList.add('wa-float--hidden');
    }
  }
  updateWaFloat();
  window.addEventListener('scroll', updateWaFloat, { passive: true });
  window.addEventListener('resize', updateWaFloat);

  // ---------- Scroll suave con offset por el nav fijo ----------
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-scroll]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (!targetId || targetId.charAt(0) !== '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

  // ---------- Reveal on scroll ----------
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
