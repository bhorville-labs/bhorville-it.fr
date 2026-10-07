/* ==========================================================================
   bhorville-it.fr — JavaScript vanilla
   Configuration (config/site.js), navigation mobile, ombre d'en-tête,
   apparitions au défilement, section active. Aucune dépendance.
   ========================================================================== */

(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  var yearEl = document.getElementById('year');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     Configuration centralisée
     ====================================================================== */

  var cfg = window.SITE_CONFIG || {};

  function setAttr(selector, attr, value) {
    if (!value) return;
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function displayUrl(url) {
    return String(url).replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  function applyConfig() {
    /* Textes génériques : name, title, domain */
    Array.prototype.forEach.call(document.querySelectorAll('[data-config]'), function (el) {
      var value = cfg[el.getAttribute('data-config')];
      if (typeof value === 'string' && value) el.textContent = value;
    });

    /* Adresse e-mail */
    if (cfg.email) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-email]'), function (el) {
        el.setAttribute('href', 'mailto:' + cfg.email);
        if (el.classList.contains('contact-value')) el.textContent = cfg.email;
      });
    }

    /* Liens externes : URL + libellé affiché */
    var urls = {
      github: cfg.githubUrl,
      onpremsoftware: cfg.onPremSoftwareUrl,
      'horville-labs': cfg.horvilleLabsUrl
    };
    Array.prototype.forEach.call(document.querySelectorAll('[data-link]'), function (el) {
      var url = urls[el.getAttribute('data-link')];
      if (!url) return;
      el.setAttribute('href', url);
      var label = el.querySelector('[data-link-url]');
      if (label) label.textContent = displayUrl(url);
    });

    /* Projets : activation / désactivation et URL */
    var projects = cfg.projects || [];
    Array.prototype.forEach.call(document.querySelectorAll('[data-project]'), function (card) {
      var id = card.getAttribute('data-project');
      var project = null;
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === id) { project = projects[i]; break; }
      }
      if (!project) return;

      if (project.enabled === false) {
        if (card.parentNode) card.parentNode.removeChild(card);
        return;
      }

      var title = card.querySelector('[data-project-title]');
      if (project.title && title) title.textContent = project.title;

      var link = card.querySelector('[data-project-link]');
      if (link && project.url) {
        link.setAttribute('href', project.url);
      } else if (link) {
        link.parentNode.removeChild(link);
      }
    });

    /* Numérotation des projets visibles */
    var index = 1;
    Array.prototype.forEach.call(document.querySelectorAll('.projects-grid .project'), function (card) {
      var el = card.querySelector('.project-index');
      if (el) el.textContent = (index < 10 ? '0' : '') + index;
      index++;
    });

    /* SEO : resynchronisation du <head> (valeurs HTML = repli sans JS) */
    var seoTitle = (cfg.name || '') + (cfg.title ? ' — ' + cfg.title : '');

    if (cfg.name && cfg.title) {
      document.title = seoTitle + (cfg.domain ? ' | ' + cfg.domain : '');
      setAttr('meta[property="og:title"]', 'content', seoTitle);
      setAttr('meta[name="twitter:title"]', 'content', seoTitle);
    }
    if (cfg.name) {
      setAttr('meta[property="og:site_name"]', 'content', cfg.name);
      setAttr('meta[name="author"]', 'content', cfg.name);
    }
    if (cfg.baseUrl) {
      setAttr('link[rel="canonical"]', 'href', cfg.baseUrl);
      setAttr('meta[property="og:url"]', 'content', cfg.baseUrl);
      setAttr('meta[property="og:image"]', 'content', cfg.baseUrl + 'assets/og-image.svg');
      setAttr('meta[name="twitter:image"]', 'content', cfg.baseUrl + 'assets/og-image.svg');
    }
    if (cfg.name && cfg.baseUrl) {
      var ld = document.querySelector('script[type="application/ld+json"]');
      if (ld) {
        try {
          var data = JSON.parse(ld.textContent);
          data.name = cfg.name;
          data.url = cfg.baseUrl;
          ld.textContent = JSON.stringify(data, null, 2);
        } catch (err) { /* JSON-LD non critique */ }
      }
    }
  }

  applyConfig();

  /* ======================================================================
     Comportements
     ====================================================================== */

  /* Année courante dans le pied de page */
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Ombre de l'en-tête au défilement ---------- */
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });
  }

  /* ---------- Apparition au défilement ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealEls, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealEls, function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Section active dans la navigation ---------- */
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]:not(.nav-cta)');
  var sections = [];

  Array.prototype.forEach.call(navLinks, function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) sections.push({ id: id, el: section, link: link });
  });

  function setActive(id) {
    Array.prototype.forEach.call(navLinks, function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { sectionObserver.observe(s.el); });
  }
})();
