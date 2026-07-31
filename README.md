# Portfolio de Ken — Technicien Systèmes & Réseaux

Site vitrine / portfolio personnel (one-page) construit en **HTML + SCSS (Sass) + JavaScript vanilla**.
Aucun framework, aucune dépendance à part le compilateur Sass. Le code est volontairement
simple et commenté pour être facile à relire et à modifier.

## 🗂️ Structure du projet

```
portfolio_ken/
├── index.html          → toute la structure de la page (une seule page)
├── css/
│   └── main.css        → CSS compilé (généré, ne pas éditer à la main)
├── scss/               → sources de style (à éditer)
│   ├── main.scss       → point d'entrée (importe les partials)
│   ├── _variables.scss → couleurs, polices, tailles → change le thème ici
│   ├── _mixins.scss    → helpers réutilisables (media queries, carte…)
│   ├── _base.scss      → reset + typographie globale
│   ├── _layout.scss    → header, navigation, footer, sections
│   ├── _components.scss → boutons, tags, timeline
│   └── _sections.scss  → styles propres à chaque section
├── js/
│   └── main.js         → menu mobile, animations au scroll, formulaire
└── assets/             → images, CV PDF, favicon…
```

## 🚀 Démarrer

Il faut [Node.js](https://nodejs.org/) installé. Ensuite :

```bash
npm install        # installe Sass (une seule fois)
npm run watch      # compile le SCSS en continu pendant que tu travailles
```

Ouvre ensuite `index.html` dans ton navigateur (double-clic), ou lance un petit serveur local :

```bash
npm run serve      # démarre un serveur sur http://localhost:3000
```

Pour générer la version **minifiée** (production) :

```bash
npm run build      # produit un css/main.css compressé
```

## ✏️ Personnaliser

Cherche les commentaires `<!-- TODO -->` dans `index.html` et `TODO` dans `js/main.js` :
ce sont tous les endroits à remplir avec les vraies infos de Ken.

- **Textes / projets / parcours** → `index.html`
- **Couleurs & polices** → `scss/_variables.scss`
- **CV** → dépose le PDF dans `assets/cv-ken.pdf`
- **Formulaire de contact** → à brancher sur un service (Formspree, Netlify Forms,
  EmailJS…) dans `js/main.js`. Pour l'instant il affiche juste un message de démo.
- **Liens** → email, LinkedIn, GitHub dans la section Contact.

## 🌐 Mise en ligne

Le site est 100 % statique : il s'héberge partout (GitHub Pages, Netlify, Vercel,
ou l'hébergement actuel de `lipatech.fr`). Il suffit d'envoyer `index.html`,
le dossier `css/`, `js/` et `assets/`.

> Astuce : lance `npm run build` avant de mettre en ligne pour un CSS plus léger.
