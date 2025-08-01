# Site Vitrine Hookly

Site vitrine professionnel développé avec Jekyll et déployé sur Netlify.

## 🏗️ Structure du projet

```
Hookly/
├── _config.yml          # Configuration Jekyll
├── netlify.toml         # Configuration Netlify
├── _layouts/            # Templates de page
│   ├── default.html     # Layout principal
│   └── page.html        # Layout pour les pages
├── _includes/           # Composants réutilisables
│   ├── header.html      # En-tête du site
│   ├── footer.html      # Pied de page
│   └── contact-form.html # Formulaire de contact
├── assets/              # Ressources statiques
│   ├── css/
│   │   └── main.css     # Styles principaux
│   ├── js/
│   │   └── main.js      # JavaScript principal
│   └── images/          # Images du site
├── index.html           # Page d'accueil
├── entreprise.html      # Page entreprise
├── equipe.html          # Page équipe
└── merci.html           # Page de remerciement
```

## 🎨 Charte graphique

- **Couleur principale** : `#8c6b72` (Violet-prune)
- **Couleur secondaire** : `#f7ede3` (Beige-crème)
- **Police principale** : Segoe UI, system fonts
- **Police titres** : Georgia, serif

## 🚀 Installation et développement

### Prérequis
- Ruby 3.0+
- Bundler

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd Hookly

# Installer les dépendances
bundle install

# Lancer le serveur de développement
bundle exec jekyll serve

# Accéder au site
http://localhost:4000
```

### Build de production
```bash
bundle exec jekyll build
```

## 📝 Fonctionnalités

### ✅ Développé
- [x] Structure Jekyll complète
- [x] Charte graphique implémentée
- [x] 3 pages principales (Accueil, Entreprise, Équipe)
- [x] Formulaire de contact avec Netlify Forms
- [x] Ajout dynamique de réseaux sociaux
- [x] Design responsive
- [x] Navigation mobile
- [x] Configuration Netlify

### 🔄 En cours
- [ ] Intégration du logo Hookly
- [ ] Tests cross-browser
- [ ] Optimisations performance

## 📋 Formulaire de contact

Le formulaire inclut :
- Champs obligatoires : Prénom, Nom, Email, Objet, Message
- Section optionnelle : Réseaux sociaux (max 5)
- Validation côté client
- Traitement via Netlify Forms

## 🌐 Déploiement

### Netlify
1. Connecter le repository GitHub à Netlify
2. Configuration automatique via `netlify.toml`
3. Domaine personnalisé : Hookly.fr

### DNS (Hostinger)
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [site-name].netlify.app
```

## 📱 Responsive Design

- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🔧 Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript
- **Générateur** : Jekyll 4.2
- **Hébergement** : Netlify
- **Formulaires** : Netlify Forms
- **Domaine** : Hostinger

## 📞 Support

Pour toute question technique, consultez la documentation Jekyll ou contactez l'équipe de développement.

---

**🔧 Développé pour Hookly** - Site vitrine professionnel