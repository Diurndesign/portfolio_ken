/* ============================================================
 *  main.js — le "système d'exploitation" du portfolio
 *  Vanilla JS, aucune dépendance.
 *  Lit js/data.js (PROFILE, SECTIONS) et construit :
 *   - desktop : dossiers + fenêtres déplaçables
 *   - mobile  : apps + vue plein écran
 * ============================================================ */
(function () {
  'use strict';

  /* -------- petits helpers -------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* -------- 1. Remplir les infos de profil -------- */
  var brand = PROFILE.brand ? PROFILE.brand : PROFILE.name;
  $$('[data-brand]').forEach(function (n) { n.textContent = brand; });
  $$('[data-name]').forEach(function (n) { n.textContent = PROFILE.name; });
  $$('[data-role]').forEach(function (n) { n.textContent = PROFILE.role + ' · ' + PROFILE.tagline; });
  $$('[data-initial]').forEach(function (n) { n.textContent = PROFILE.name.charAt(0); });

  /* -------- 2. Horloge (barre de menu + téléphone) -------- */
  function tick() {
    var d = new Date();
    var t = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    $$('[data-clock]').forEach(function (n) { n.textContent = t; });
  }
  tick();
  setInterval(tick, 15000);

  /* ============================================================
   *  PARTIE DESKTOP — dossiers + fenêtres
   * ============================================================ */
  var iconsList = $('#desktop-icons');
  var windowsLayer = $('#windows');
  var hint = $('#desktop-hint');
  var zTop = 10;
  var openWins = {};   // id -> element
  var cascade = 0;

  // Icône SVG "dossier" avec couleur d'accent
  function folderSVG(accent) {
    return '<svg viewBox="0 0 64 52" class="folder" aria-hidden="true">' +
      '<path d="M2 8a4 4 0 0 1 4-4h16l6 6h30a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="' + accent + '" opacity=".28"/>' +
      '<path d="M2 16h60v30a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="' + accent + '"/>' +
      '</svg>';
  }

  // Construire les dossiers du bureau
  SECTIONS.forEach(function (s) {
    var li = el('li', 'desk-icon');
    li.setAttribute('tabindex', '0');
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', 'Ouvrir ' + s.label);
    li.innerHTML = folderSVG(s.accent) +
      '<span class="desk-icon__glyph">' + s.glyph + '</span>' +
      '<span class="desk-icon__label">' + s.label + '</span>';

    var open = function () { openWindow(s); };
    li.addEventListener('dblclick', open);
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    // Sélection visuelle au simple clic
    li.addEventListener('click', function () {
      $$('.desk-icon.is-selected').forEach(function (n) { n.classList.remove('is-selected'); });
      li.classList.add('is-selected');
    });
    // Sur écran tactile large, un simple tap ouvre
    li.addEventListener('touchend', function (e) { e.preventDefault(); open(); });

    iconsList.appendChild(li);
  });

  function focusWindow(win) {
    win.style.zIndex = ++zTop;
    $$('.window.is-active').forEach(function (n) { n.classList.remove('is-active'); });
    win.classList.add('is-active');
  }

  function openWindow(section) {
    if (hint) hint.classList.add('is-hidden');

    // Déjà ouverte ? on la remet devant.
    if (openWins[section.id]) {
      var existing = openWins[section.id];
      existing.hidden = false;
      focusWindow(existing);
      return;
    }

    var win = el('section', 'window');
    win.style.setProperty('--accent', section.accent);
    win.innerHTML =
      '<header class="window__bar">' +
        '<div class="window__lights">' +
          '<button class="light light--close" aria-label="Fermer"></button>' +
          '<button class="light light--min" aria-label="Réduire"></button>' +
          '<button class="light light--zoom" aria-label="Agrandir"></button>' +
        '</div>' +
        '<span class="window__title">' + section.glyph + ' ' + section.label + '</span>' +
      '</header>' +
      '<div class="window__body">' + section.html + '</div>';

    // Cascade de position
    var offset = (cascade % 5) * 26;
    win.style.left = (48 + offset) + 'px';
    win.style.top = (60 + offset) + 'px';
    cascade++;

    windowsLayer.appendChild(win);
    openWins[section.id] = win;
    focusWindow(win);
    wireForm(win);

    // Boutons
    $('.light--close', win).addEventListener('click', function () { closeWindow(section.id); });
    $('.light--min', win).addEventListener('click', function () { win.hidden = true; });
    $('.light--zoom', win).addEventListener('click', function () { win.classList.toggle('is-max'); });

    // Focus au clic n'importe où sur la fenêtre
    win.addEventListener('pointerdown', function () { focusWindow(win); });

    makeDraggable(win, $('.window__bar', win));
  }

  function closeWindow(id) {
    var win = openWins[id];
    if (!win) return;
    win.classList.add('is-closing');
    setTimeout(function () {
      win.remove();
      delete openWins[id];
    }, 160);
  }

  // Déplacement d'une fenêtre par sa barre de titre
  function makeDraggable(win, handle) {
    var sx, sy, ox, oy, dragging = false;
    handle.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.light')) return;          // pas sur les boutons
      dragging = true;
      win.classList.remove('is-max');
      sx = e.clientX; sy = e.clientY;
      ox = win.offsetLeft; oy = win.offsetTop;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var nx = ox + (e.clientX - sx);
      var ny = oy + (e.clientY - sy);
      var parent = win.parentElement.getBoundingClientRect();
      // rester dans l'écran
      nx = Math.max(-win.offsetWidth + 90, Math.min(nx, parent.width - 60));
      ny = Math.max(0, Math.min(ny, parent.height - 40));
      win.style.left = nx + 'px';
      win.style.top = ny + 'px';
    });
    var stop = function () { dragging = false; };
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
  }

  /* ============================================================
   *  PARTIE MOBILE — apps + vue plein écran
   * ============================================================ */
  var appsList = $('#apps');
  var appView = $('#app-view');
  var appTitle = $('#app-title');
  var appBody = $('#app-body');
  var homescreen = $('#homescreen');

  SECTIONS.forEach(function (s) {
    var li = el('li', 'app');
    li.innerHTML =
      '<button class="app__icon" style="--accent:' + s.accent + '" aria-label="Ouvrir ' + s.label + '">' +
        '<span>' + s.glyph + '</span>' +
      '</button>' +
      '<span class="app__label">' + s.label + '</span>';
    $('.app__icon', li).addEventListener('click', function () { openApp(s); });
    appsList.appendChild(li);
  });

  function openApp(section) {
    appTitle.textContent = section.glyph + ' ' + section.label;
    appBody.innerHTML = section.html;
    appView.hidden = false;
    // reflow puis animation
    requestAnimationFrame(function () { appView.classList.add('is-open'); });
    homescreen.classList.add('is-behind');
    wireForm(appView);
  }

  function closeApp() {
    appView.classList.remove('is-open');
    homescreen.classList.remove('is-behind');
    setTimeout(function () { appView.hidden = true; appBody.innerHTML = ''; }, 280);
  }

  $('#app-back').addEventListener('click', closeApp);

  /* ============================================================
   *  Formulaire de contact (desktop + mobile)
   *  TODO: brancher un vrai service (Formspree, EmailJS...).
   * ============================================================ */
  function wireForm(scope) {
    var form = $('.contact-form', scope);
    if (!form || form.dataset.wired) return;
    form.dataset.wired = '1';
    var note = $('.form-note', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      note.hidden = false;
      note.textContent = 'Merci ! Message bien reçu. (Démo — formulaire à brancher.)';
      note.className = 'form-note is-success';
      form.reset();
    });
  }

  /* ============================================================
   *  Allumage de l'écran au chargement
   * ============================================================ */
  document.body.classList.add('is-booting');
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.body.classList.remove('is-booting');
      document.body.classList.add('is-on');
    }, 250);
  });
  // filet de sécurité si 'load' tarde
  setTimeout(function () {
    if (document.body.classList.contains('is-booting')) {
      document.body.classList.remove('is-booting');
      document.body.classList.add('is-on');
    }
  }, 1800);

})();
