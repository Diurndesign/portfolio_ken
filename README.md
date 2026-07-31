# Portfolio de Ken — ThinkPad / Linux 💻

Portfolio interactif de Ken (technicien systèmes & réseaux, BTS SIO SISR),
présenté comme un **ordinateur portable qui s'ouvre**.

- **Sur grand écran** → un **ThinkPad fermé** avec le nom **LIPATECH** en grand
  et un bouton **« Ouvrir »**. Au clic : LIPATECH devient flou, **l'écran se lève
  et s'allume**, révélant un **bureau Linux** (barre GNOME + dock Ubuntu). On ouvre
  les **dossiers** (double-clic) ou les icônes du **dock** → des **fenêtres**
  déplaçables et empilables avec les infos de Ken.
- **Sur mobile** → un **smartphone** réaliste. On **touche les apps** pour ouvrir
  chaque rubrique en plein écran.

Construit en **HTML + SCSS (Sass) + JavaScript vanilla**, sans framework.
Rendu photoréaliste 100 % CSS/SVG (matières, reflets, grain, ombres).

## ✨ Le principe malin : une seule source de contenu

Tout le texte de Ken est dans **un seul fichier** : `js/data.js`.
Le desktop (fenêtres) et le mobile (apps) affichent ces mêmes données —
**rien à écrire en double**. Tu modifies une rubrique une fois, elle change
partout.

## 🗂️ Structure

```
portfolio_ken/
├── index.html          → la "scène" (l'ordinateur + le téléphone)
├── css/
│   └── main.css        → CSS compilé (généré — ne pas éditer à la main)
├── js/
│   ├── data.js         → ⭐ TOUT LE CONTENU DE KEN (à remplir)
│   └── main.js         → le "système" : dossiers, fenêtres, apps, horloge…
└── scss/               → sources de style (à éditer)
    ├── main.scss       → point d'entrée
    ├── _variables.scss → couleurs, polices, breakpoint → thème ici
    ├── _mixins.scss    → helpers (media queries, grain photo)
    ├── _base.scss      → reset global
    ├── _scene.scss     → le studio + choix appareil + allumage téléphone
    ├── _laptop.scss    → le ThinkPad 3D + intro + bureau Linux (desktop)
    ├── _phone.scss     → le téléphone + les apps (mobile)
    └── _content.scss   → le contenu (textes, projets, timeline, formulaire)
```

## 🚀 Démarrer

Il faut [Node.js](https://nodejs.org/). Ensuite :

```bash
npm install        # installe Sass (une fois)
npm run watch      # compile le SCSS en continu pendant que tu travailles
npm run serve      # petit serveur local sur http://localhost:3000
```

Version minifiée pour la mise en ligne :

```bash
npm run build
```

## ✏️ Personnaliser

- **Textes / projets / parcours / compétences** → `js/data.js` (cherche les `TODO`).
- **Coordonnées** (email, LinkedIn, GitHub) → objet `PROFILE` dans `js/data.js`.
- **CV** → dépose le PDF dans `assets/cv-ken.pdf`.
- **Couleurs, polices, breakpoint desktop/mobile** → `scss/_variables.scss`.
- **Ajouter/enlever un dossier-app** → ajoute une entrée dans le tableau `SECTIONS`
  de `js/data.js` : le dossier (desktop) ET l'app (mobile) apparaissent tout seuls.
- **Formulaire de contact** → à brancher sur un service (Formspree / Netlify Forms /
  EmailJS) dans `js/main.js`. Pour l'instant : message de démo.

## 🌐 Mise en ligne

100 % statique : s'héberge partout (GitHub Pages, Netlify, Vercel, ou l'hébergement
actuel de `lipatech.fr`). Envoie `index.html`, `css/`, `js/` et `assets/`.
Lance `npm run build` avant pour un CSS plus léger.
