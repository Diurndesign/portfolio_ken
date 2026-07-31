# Portfolio de Ken Lipari — Lipatech

Portfolio en **HTML + SCSS (Sass) + JavaScript vanilla**, sans framework.

## État actuel

Point de départ : un **hero en forme de carte mère** (SVG), PCB sombre + circuits
vert lime (couleur signature Lipatech). L'identité de Ken est imprimée en
« sérigraphie » sur la carte. Les composants (CPU, RAM, PCIe, chipset…) serviront
de base pour la navigation / les sections à venir.

## Structure

```
index.html            → le hero (SVG carte mère)
css/main.css          → CSS compilé (généré)
scss/
  main.scss           → point d'entrée
  _tokens.scss        → couleurs, typo → thème ici
  _base.scss          → reset + fond
  _hero.scss          → styles de la carte mère
js/main.js            → (à venir : composants cliquables)
```

## Démarrer

```bash
npm install     # installe Sass (une fois)
npm run watch   # compile le SCSS en continu
```

Puis ouvre `index.html`. Version prod : `npm run build`.
