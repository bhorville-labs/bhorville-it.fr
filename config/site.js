/* ==========================================================================
   config/site.js — Configuration centralisée du site
   --------------------------------------------------------------------------
   Fichier unique à modifier pour changer les informations générales.
   Aucun autre fichier de configuration n'est nécessaire.
   ========================================================================== */

window.SITE_CONFIG = {

  /* --- Identité --- */
  name:  "Bernard Horville",
  title: "IT & Software",

  /* --- Domaine et URL principale --- */
  domain:  "bhorville-it.fr",
  baseUrl: "https://bhorville-it.fr/",

  /* --- Contact et liens externes --- */
  email:            "bernard.horville@ik.me",
  githubUrl:        "https://github.com/bhorville-labs",
  onPremSoftwareUrl: "https://onpremsoftware.com",
  horvilleLabsUrl:  "https://horville-labs.fr",

  /* --- Projets ---
     id      : correspond à l'attribut data-project dans index.html
     enabled : true  -> la carte est affichée
               false -> la carte est retirée
     url     : adresse du lien ; "" -> pas de lien */
  projects: [
    { id: "onpremsoftware",    title: "OnPremSoftware",    url: "https://onpremsoftware.com", enabled: true  },
    { id: "horville-labs",     title: "Horville Labs",     url: "https://horville-labs.fr",   enabled: true  },
    { id: "parental-control",  title: "Parental Control",  url: "",                          enabled: false },
    { id: "network-inspector", title: "Network Inspector", url: "",                          enabled: false }
  ]

};
