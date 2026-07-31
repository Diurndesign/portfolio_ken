/* ============================================================
 *  data.js — SOURCE UNIQUE DE CONTENU
 *  Tout le texte de Ken est ici. Le desktop (fenêtres) ET le
 *  mobile (apps) affichent ces mêmes données : rien à dupliquer.
 *
 *  TODO Ken : remplace les textes ci-dessous par tes vraies infos.
 * ============================================================ */

/* Petites infos de profil réutilisées un peu partout */
const PROFILE = {
  name: 'Ken',                         // TODO: nom complet
  role: 'Technicien Systèmes & Réseaux',
  brand: 'Lipatech',                   // marque / pseudo (mets '' pour l'enlever)
  tagline: 'BTS SIO · option SISR',
  email: 'contact@lipatech.fr',        // TODO
  linkedin: '#',                       // TODO
  github: '#',                         // TODO
  cv: 'assets/cv-ken.pdf'              // TODO: dépose le PDF ici
};

/* Chaque "section" devient un dossier (desktop) et une app (mobile).
 * - id      : identifiant unique
 * - label   : nom affiché
 * - glyph   : petite icône (emoji)
 * - accent  : couleur d'accent de l'icône
 * - html    : contenu affiché dans la fenêtre / l'app
 */
const SECTIONS = [
  {
    id: 'about',
    label: 'À propos',
    glyph: '👤',
    accent: '#38bdf8',
    html: `
      <div class="doc">
        <p class="lead">Bonjour, moi c'est <strong>${PROFILE.name}</strong> —
        ${PROFILE.role.toLowerCase()}, titulaire d'un BTS SIO option SISR.</p>
        <p>Passionné d'informatique depuis toujours, je me suis spécialisé dans
        l'administration des <strong>systèmes et réseaux</strong>. J'aime concevoir
        des infrastructures fiables, les sécuriser et les superviser.</p>
        <p>Rigoureux et curieux, je diagnostique, j'optimise et je documente.
        Serveur Active Directory, réseau segmenté en VLAN, solution de sauvegarde :
        je cherche toujours la solution la plus propre et la plus sûre.</p>
        <ul class="facts">
          <li><span>📍</span> France <!-- TODO --></li>
          <li><span>🎓</span> BTS SIO – SISR</li>
          <li><span>🚗</span> Permis B</li>
          <li><span>🌐</span> Français · Anglais technique</li>
        </ul>
      </div>`
  },

  {
    id: 'skills',
    label: 'Compétences',
    glyph: '🧰',
    accent: '#22d3ee',
    html: `
      <div class="doc">
        <div class="skill-grid">
          <div class="skill">
            <h3>🌐 Réseau</h3>
            <div class="tags"><span>TCP/IP</span><span>VLAN</span><span>Routage</span><span>VPN</span><span>DHCP</span><span>DNS</span><span>Pare-feu</span><span>Cisco</span></div>
          </div>
          <div class="skill">
            <h3>🖥️ Systèmes</h3>
            <div class="tags"><span>Windows Server</span><span>Active Directory</span><span>GPO</span><span>Linux</span><span>Bash</span><span>PowerShell</span></div>
          </div>
          <div class="skill">
            <h3>📦 Virtualisation & Sauvegarde</h3>
            <div class="tags"><span>VMware</span><span>Proxmox</span><span>Hyper-V</span><span>Veeam</span></div>
          </div>
          <div class="skill">
            <h3>📊 Supervision</h3>
            <div class="tags"><span>Nagios</span><span>Zabbix</span><span>GLPI</span><span>Wireshark</span></div>
          </div>
          <div class="skill">
            <h3>🔒 Sécurité</h3>
            <div class="tags"><span>Segmentation</span><span>VPN IPsec</span><span>Filtrage</span><span>Sauvegardes</span></div>
          </div>
          <div class="skill">
            <h3>🛠️ Support & Outils</h3>
            <div class="tags"><span>Dépannage</span><span>Assistance</span><span>Documentation</span><span>Git</span></div>
          </div>
        </div>
      </div>`
  },

  {
    id: 'projects',
    label: 'Projets',
    glyph: '🗂️',
    accent: '#818cf8',
    html: `
      <div class="doc">
        <article class="project">
          <span class="badge">Réseau</span>
          <h3>Réseau d'entreprise segmenté</h3>
          <p><b>Contexte :</b> réseau d'une PME à structurer et sécuriser.</p>
          <p><b>Réalisé :</b> plan d'adressage, VLAN (postes / serveurs / invités), routage inter-VLAN, règles de pare-feu.</p>
          <p><b>Résultat :</b> trafic isolé par service, sécurité renforcée.</p>
        </article>
        <article class="project">
          <span class="badge">Systèmes</span>
          <h3>Domaine Active Directory</h3>
          <p><b>Contexte :</b> centraliser la gestion des utilisateurs et des postes.</p>
          <p><b>Réalisé :</b> Windows Server, contrôleur de domaine, OU, utilisateurs et GPO.</p>
          <p><b>Résultat :</b> authentification centralisée, stratégies automatiques.</p>
        </article>
        <article class="project">
          <span class="badge">Supervision</span>
          <h3>Supervision avec Nagios</h3>
          <p><b>Contexte :</b> anticiper les pannes serveurs et réseau.</p>
          <p><b>Réalisé :</b> installation de Nagios, hôtes et services surveillés, alertes mail.</p>
          <p><b>Résultat :</b> détection proactive, meilleure disponibilité.</p>
        </article>
        <article class="project">
          <span class="badge">Virtualisation</span>
          <h3>Plateforme virtualisée & sauvegardes</h3>
          <p><b>Contexte :</b> mutualiser les serveurs, sécuriser les données.</p>
          <p><b>Réalisé :</b> hyperviseur Proxmox, VM, sauvegardes planifiées et testées.</p>
          <p><b>Résultat :</b> infrastructure consolidée, données protégées.</p>
        </article>
      </div>`
  },

  {
    id: 'experience',
    label: 'Parcours',
    glyph: '🎓',
    accent: '#34d399',
    html: `
      <div class="doc">
        <ol class="timeline">
          <li>
            <span class="date">2024 – 2025</span>
            <h3>Stage – Technicien réseau <em>· Entreprise</em></h3>
            <p>Support, administration réseau et systèmes, participation à la mise en place d'une nouvelle infrastructure.</p>
          </li>
          <li>
            <span class="date">2023 – 2025</span>
            <h3>BTS SIO – option SISR <em>· Établissement</em></h3>
            <p>Solutions d'Infrastructure, Systèmes et Réseaux : réseau, systèmes, virtualisation, supervision, cybersécurité.</p>
          </li>
          <li>
            <span class="date">2023</span>
            <h3>Baccalauréat <em>· Spécialité</em></h3>
            <p>Obtention du baccalauréat, orientation vers l'informatique.</p>
          </li>
        </ol>
      </div>`
  },

  {
    id: 'contact',
    label: 'Contact',
    glyph: '✉️',
    accent: '#fb7185',
    html: `
      <div class="doc">
        <p class="lead">Une question, une opportunité, un poste ? Écrivez-moi, je réponds vite.</p>
        <div class="contact-links">
          <a href="mailto:${PROFILE.email}">✉️ ${PROFILE.email}</a>
          <a href="${PROFILE.linkedin}" target="_blank" rel="noopener">💼 LinkedIn</a>
          <a href="${PROFILE.github}" target="_blank" rel="noopener">🐙 GitHub</a>
        </div>
        <form class="contact-form" novalidate>
          <label>Nom<input type="text" name="name" required></label>
          <label>Email<input type="email" name="email" required></label>
          <label>Message<textarea name="message" rows="4" required></textarea></label>
          <button type="submit" class="btn">Envoyer</button>
          <p class="form-note" hidden></p>
        </form>
      </div>`
  }
];
