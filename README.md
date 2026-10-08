# bhorville-it.fr

Site professionnel (vitrine) — IT, logiciels et projets personnels.

Site statique, sans framework ni build system. Compatible **GitHub Pages**.

## Structure

```
/
├── index.html
├── config/
│   └── site.js
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── og-image.svg
│   └── apple-touch-icon.svg
├── favicon.svg
└── README.md
```

## Lancer le site

Ouvrir simplement `index.html` dans un navigateur, ou servir le dossier :

```bash
npx serve .
# ou
python -m http.server 8000
```

## Configuration

Toutes les informations variables sont centralisées dans **`config/site.js`**.
C'est le seul fichier à modifier pour changer l'identité, les liens ou l'état des projets.

```js
window.SITE_CONFIG = {
  name:  "bhorville-it.fr",
  title: "IT & Software",
  domain:  "bhorville-it.fr",
  baseUrl: "https://bhorville-it.fr/",
  email:             "contact@bhorville-it.fr",
  githubUrl:         "https://github.com/bhorville-labs",
  onPremSoftwareUrl: "https://onpremsoftware.com",
  horvilleLabsUrl:   "https://horville-labs.fr",
  projects: [
    { id: "onpremsoftware",    url: "https://onpremsoftware.com", enabled: true  },
    { id: "horville-labs",     url: "https://horville-labs.fr",   enabled: true  },
    { id: "parental-control",  url: "",                          enabled: false },
    { id: "network-inspector", url: "",                          enabled: false }
  ]
};
```

- `enabled: false` retire la carte projet du rendu.
- `url: ""` retire le lien « Visiter le site » (la carte affiche « Lien à venir »).
- `js/main.js` applique la configuration au chargement, y compris les balises SEO
  du `<head>` (les valeurs en dur dans `index.html` servent de repli sans JavaScript).

## Personnalisation

| Élément | Fichier | Repère |
|---|---|---|
| Nom, titre, domaine, e-mail, liens, projets | `config/site.js` | `window.SITE_CONFIG` |
| Textes / sections éditoriales | `index.html` | sections `<section id="...">` |
| Couleurs, espacements | `css/style.css` | variables `:root` |
| Description SEO, Open Graph description | `index.html` | `<head>` |

> Aucune donnée personnelle, certification ni expérience précise n'a été inventée.

## Déploiement (GitHub Pages)

1. Pousser le dépôt sur GitHub.
2. *Settings → Pages → Branch: `main` → Folder: `/ (root)`*.
3. Le site est servi sur `https://<utilisateur>.github.io/<depot>/`.

## Licence

Contenu et code propres au site.
