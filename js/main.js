/* ============================================================
 *  main.js — interactions du portfolio
 *  Vanilla JS, aucune dépendance.
 * ============================================================ */
(function () {
  'use strict';

  /* --- 1. Année dynamique dans le footer --- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- 2. Menu mobile (ouverture / fermeture) --- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && nav && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    // Ferme le menu quand on clique sur un lien
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- 3. Bordure du header au scroll --- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- 4. Apparition des éléments au scroll (IntersectionObserver) --- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback : tout afficher
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --- 5. Formulaire de contact (démo côté client) ---
     TODO: brancher un vrai service d'envoi (Formspree, Netlify Forms,
     EmailJS...). Pour l'instant on affiche juste un message de confirmation. */
  var form = document.querySelector('.contact__form');
  if (form) {
    var note = form.querySelector('.form__note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (note) {
        note.hidden = false;
        note.textContent = 'Merci ! Votre message a bien été pris en compte. (Formulaire de démonstration — à brancher.)';
        note.className = 'form__note is-success';
      }
      form.reset();
    });
  }
})();
