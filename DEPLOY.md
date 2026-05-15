# Déploiement sur GitHub Pages (gratuit)

## Fichiers à uploader
- index.html
- manifest.json
- sw.js
- icon-192.png
- icon-512.png

---

## Étapes

### 1. Créer un compte GitHub
https://github.com/signup (gratuit)

### 2. Créer un repository
- Bouton vert "New" en haut à gauche
- Repository name : `calories-app` (ou ce que tu veux)
- Visibilité : **Public** (obligatoire pour GitHub Pages gratuit)
- Cliquer "Create repository"

### 3. Uploader les fichiers
- Bouton "Add file" → "Upload files"
- Glisser les 5 fichiers
- Cliquer "Commit changes"

### 4. Activer GitHub Pages
- Onglet **Settings** (en haut du repo)
- Menu gauche → **Pages**
- Source : **Deploy from a branch**
- Branch : **main** / **(root)**
- Cliquer **Save**

### 5. Attendre 1-2 minutes
L'URL sera : `https://TON-PSEUDO.github.io/calories-app`

---

## Mettre à jour l'app
1. Ouvre `index.html` dans le repo GitHub
2. Clique l'icône crayon (Edit)
3. Fais tes modifications
4. "Commit changes" → le site se met à jour en ~30 secondes

---

## Installer comme app sur iPhone
1. Ouvre l'URL dans **Safari** (pas Chrome)
2. Bouton Partager (carré avec flèche vers le haut)
3. "Sur l'écran d'accueil"
4. L'app s'installe avec icône, fonctionne hors ligne

## Installer sur Android
1. Ouvre l'URL dans Chrome
2. Menu (3 points) → "Ajouter à l'écran d'accueil"

---

## Données
- Stockées localement dans le navigateur (localStorage)
- Persistent entre les sessions
- Sauvegarde : bouton ↓ Exporter dans l'app
- Restauration : bouton ↑ Importer
