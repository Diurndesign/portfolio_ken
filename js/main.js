/* ============================================================
 *  main.js — le "système" du portfolio
 *  Vanilla JS, aucune dépendance. Lit js/data.js.
 *   - desktop : ThinkPad qui s'ouvre → bureau Linux (dossiers + dock)
 *   - mobile  : téléphone → apps
 * ============================================================ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var pad = function (n) { return String(n).padStart(2, '0'); };

  /* -------- Profil -------- */
  var brand = PROFILE.brand ? PROFILE.brand : PROFILE.name;
  $$('[data-brand-big]').forEach(function (n) { n.textContent = brand.toUpperCase(); });
  $$('[data-brand]').forEach(function (n) { n.textContent = brand; });
  $$('[data-name]').forEach(function (n) { n.textContent = PROFILE.name; });
  $$('[data-role]').forEach(function (n) { n.textContent = PROFILE.role + ' · ' + PROFILE.tagline; });
  $$('[data-initial]').forEach(function (n) { n.textContent = PROFILE.name.charAt(0); });

  /* -------- Horloge + date -------- */
  function tick() {
    var d = new Date();
    var t = pad(d.getHours()) + ':' + pad(d.getMinutes());
    $$('[data-clock]').forEach(function (n) { n.textContent = t; });
    var day = '';
    try { day = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }); }
    catch (e) { day = ''; }
    $$('[data-day]').forEach(function (n) { n.textContent = day; });
  }
  tick();
  setInterval(tick, 15000);

  /* ============================================================
   *  Icône dossier (SVG) réutilisée sur le bureau
   * ============================================================ */
  function folderSVG(accent) {
    return '<svg viewBox="0 0 64 52" class="folder" aria-hidden="true">' +
      '<path d="M2 8a4 4 0 0 1 4-4h16l6 6h30a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="' + accent + '" opacity=".28"/>' +
      '<path d="M2 16h60v30a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="' + accent + '"/></svg>';
  }

  /* ============================================================
   *  Fenêtres (style GNOME)
   * ============================================================ */
  var windowsLayer = $('#windows');
  var hint = $('#desktop-hint');
  var zTop = 10, openWins = {}, cascade = 0;

  function focusWindow(win) {
    win.style.zIndex = ++zTop;
    $$('.window.is-active').forEach(function (n) { n.classList.remove('is-active'); });
    win.classList.add('is-active');
  }

  function openWindow(section) {
    if (hint) hint.classList.add('is-hidden');

    if (openWins[section.id]) {
      var ex = openWins[section.id];
      ex.hidden = false; focusWindow(ex); return;
    }

    var win = el('section', 'window');
    win.style.setProperty('--accent', section.accent);
    win.innerHTML =
      '<header class="window__bar">' +
        '<span class="window__title">' + section.glyph + ' ' + section.label + '</span>' +
        '<button class="window__close" type="button" aria-label="Fermer">' +
          '<svg viewBox="0 0 16 16" width="15" height="15"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>' +
        '</button>' +
      '</header>' +
      '<div class="window__body">' + section.html + '</div>';

    var offset = (cascade % 5) * 26;
    win.style.left = (70 + offset) + 'px';
    win.style.top  = (54 + offset) + 'px';
    cascade++;

    windowsLayer.appendChild(win);
    openWins[section.id] = win;
    focusWindow(win);
    wireForm(win);

    $('.window__close', win).addEventListener('click', function () { closeWindow(section.id); });
    win.addEventListener('pointerdown', function () { focusWindow(win); });

    var bar = $('.window__bar', win);
    bar.addEventListener('dblclick', function (e) {
      if (!e.target.closest('.window__close')) win.classList.toggle('is-max');
    });
    makeDraggable(win, bar);
  }

  function closeWindow(id) {
    var win = openWins[id];
    if (!win) return;
    win.classList.add('is-closing');
    setTimeout(function () { win.remove(); delete openWins[id]; }, 160);
  }

  function makeDraggable(win, handle) {
    var sx, sy, ox, oy, dragging = false;
    handle.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.window__close')) return;
      dragging = true;
      win.classList.remove('is-max');
      sx = e.clientX; sy = e.clientY; ox = win.offsetLeft; oy = win.offsetTop;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var p = win.parentElement.getBoundingClientRect();
      var nx = ox + (e.clientX - sx), ny = oy + (e.clientY - sy);
      nx = Math.max(-win.offsetWidth + 90, Math.min(nx, p.width - 60));
      ny = Math.max(0, Math.min(ny, p.height - 40));
      win.style.left = nx + 'px'; win.style.top = ny + 'px';
    });
    var stop = function () { dragging = false; };
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
  }

  /* ============================================================
   *  Bureau : dossiers + dock (générés depuis SECTIONS)
   * ============================================================ */
  var iconsList = $('#desktop-icons');
  var dock = $('#dock');

  SECTIONS.forEach(function (s) {
    // Dossier sur le bureau (double-clic)
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
    li.addEventListener('click', function () {
      $$('.desk-icon.is-selected').forEach(function (n) { n.classList.remove('is-selected'); });
      li.classList.add('is-selected');
    });
    iconsList.appendChild(li);

    // Icône du dock (simple clic)
    var d = el('li', 'dock-item');
    d.innerHTML =
      '<button class="dock-item__btn" type="button" style="--accent:' + s.accent + '" aria-label="Ouvrir ' + s.label + '">' +
        '<span>' + s.glyph + '</span>' +
      '</button>' +
      '<span class="dock-item__tip">' + s.label + '</span>';
    $('.dock-item__btn', d).addEventListener('click', function () { openWindow(s); });
    dock.appendChild(d);
  });

  /* ============================================================
   *  Ouverture du ThinkPad (intro)
   * ============================================================ */
  var stage = $('#stage');
  var openBtn = $('#open-btn');
  var laptop = $('#laptop');

  function openLaptop() {
    if (!stage || stage.classList.contains('is-open')) return;
    stage.classList.add('is-open');
  }
  if (openBtn) openBtn.addEventListener('click', openLaptop);
  if (laptop) laptop.addEventListener('click', function () { openLaptop(); });

  /* ============================================================
   *  MOBILE — apps + vue plein écran
   * ============================================================ */
  var appsList = $('#apps');
  var appView = $('#app-view');
  var appTitle = $('#app-title');
  var appBody = $('#app-body');
  var homescreen = $('#homescreen');

  if (appsList) {
    SECTIONS.forEach(function (s) {
      var li = el('li', 'app');
      li.innerHTML =
        '<button class="app__icon" type="button" style="--accent:' + s.accent + '" aria-label="Ouvrir ' + s.label + '"><span>' + s.glyph + '</span></button>' +
        '<span class="app__label">' + s.label + '</span>';
      $('.app__icon', li).addEventListener('click', function () { openApp(s); });
      appsList.appendChild(li);
    });
  }

  function openApp(section) {
    appTitle.textContent = section.glyph + ' ' + section.label;
    appBody.innerHTML = section.html;
    appView.hidden = false;
    requestAnimationFrame(function () { appView.classList.add('is-open'); });
    homescreen.classList.add('is-behind');
    wireForm(appView);
  }
  function closeApp() {
    appView.classList.remove('is-open');
    homescreen.classList.remove('is-behind');
    setTimeout(function () { appView.hidden = true; appBody.innerHTML = ''; }, 280);
  }
  var appBack = $('#app-back');
  if (appBack) appBack.addEventListener('click', closeApp);

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
   *  Allumage du téléphone (mobile) au chargement
   *  (le desktop, lui, s'allume à l'ouverture du capot)
   * ============================================================ */
  document.body.classList.add('is-booting');
  function powerPhone() {
    document.body.classList.remove('is-booting');
    document.body.classList.add('is-on');
  }
  window.addEventListener('load', function () { setTimeout(powerPhone, 250); });
  setTimeout(function () { if (document.body.classList.contains('is-booting')) powerPhone(); }, 1800);

})();
