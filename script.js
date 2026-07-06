/* =========================================================
   Георгиев Стил ЕООД — споделена логика за всички страници
   ========================================================= */
(function () {
  'use strict';

  // ---- Общи данни за сайта (редактират се на едно място) ----
  var SITE = {
    brand: 'ГЕОРГИЕВ СТИЛ',
    sub: 'ВСИЧКО ЗА ДОМА · ПРОВАДИЯ',
    phone1: '0899 541 813', phone1tel: '+359899541813',
    phone2: '0897 854 845', phone2tel: '+359897854845',
    email: 'georgievstil@gmail.com',
    address: 'гр. Провадия, ул. „Цар Освободител“ №64'
  };
  var NAV = [
    { href: 'index.html', label: 'Начало', key: 'home' },
    { href: 'za-nas.html', label: 'За нас', key: 'about' },
    { href: 'mebeli.html', label: 'Мебели', key: 'mebeli' },
    { href: 'dograma.html', label: 'Дограма', key: 'dograma' },
    { href: 'shtori.html', label: 'Щори', key: 'shtori' },
    { href: 'vrati.html', label: 'Врати', key: 'vrati' },
    { href: 'kontakti.html', label: 'Контакти', key: 'contact' }
  ];

  var page = document.body.dataset.page || '';

  // ---- Вграждане на споделените елементи (навигация, футер и т.н.) ----
  function buildChrome() {
    var navLinks = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.key === page ? ' class="is-active"' : '') + '>' + n.label + '</a>';
    }).join('');

    var header =
      '<div class="loader" id="loader"><div class="loader__inner">' +
        '<span class="loader__name">' + SITE.brand + '</span><span class="loader__line"></span>' +
      '</div></div>' +
      '<div class="progress" id="progress"></div>' +
      '<header class="nav" id="nav"><div class="shell nav__row">' +
        '<a href="index.html" class="wordmark" aria-label="' + SITE.brand + ' начало">' +
          '<span class="wordmark__name">' + SITE.brand + '</span>' +
          '<span class="wordmark__sub">' + SITE.sub + '</span>' +
        '</a>' +
        '<nav class="nav__menu" id="navMenu" aria-label="Основна навигация">' + navLinks + '</nav>' +
        '<a href="kontakti.html" class="nav__cta">Запитване</a>' +
        '<button class="nav__toggle" id="navToggle" aria-label="Меню" aria-expanded="false"><span></span><span></span></button>' +
      '</div></header>';

    var footer =
      '<footer class="footer"><div class="shell footer__top">' +
        '<div class="footer__brand"><span class="footer__name">Георгиев Стил ЕООД</span>' +
          '<p>Всичко за Вашия дом на едно място — мебели, дограма, щори и врати. Провадия и региона.</p></div>' +
        '<div class="footer__cols">' +
          '<div><h5>Навигация</h5><a href="index.html">Начало</a><a href="za-nas.html">За нас</a><a href="mebeli.html">Мебели</a><a href="kontakti.html">Контакти</a></div>' +
          '<div><h5>Продукти</h5><a href="mebeli.html">Мебели</a><a href="dograma.html">Дограма</a><a href="shtori.html">Щори</a><a href="vrati.html">Врати</a></div>' +
          '<div><h5>Контакти</h5>' +
            '<a href="tel:' + SITE.phone1tel + '">' + SITE.phone1 + '</a>' +
            '<a href="tel:' + SITE.phone2tel + '">' + SITE.phone2 + '</a>' +
            '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a>' +
            '<span>' + SITE.address + '</span></div>' +
        '</div></div>' +
        '<div class="shell footer__bottom"><span>© <span id="year"></span> Георгиев Стил ЕООД. Всички права запазени.</span>' +
        '<span>Изработено с грижа към детайла.</span></div></footer>' +
      '<a href="#top" class="totop" id="toTop" aria-label="Нагоре">↑</a>' +
      '<a href="tel:' + SITE.phone1tel + '" class="callbtn" aria-label="Обадете се">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
        '<span>Обадете се</span></a>' +
      '<div class="lightbox" id="lightbox" aria-hidden="true">' +
        '<button class="lightbox__close" id="lightboxClose" aria-label="Затвори">×</button>' +
        '<figure class="lightbox__fig"><img id="lightboxImg" src="" alt="" /><figcaption id="lightboxCap"></figcaption></figure>' +
      '</div>';

    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);
  }
  buildChrome();

  // ---- Loader ----
  (function () {
    var l = document.getElementById('loader');
    if (!l) return;
    var hidden = false;
    function hide() { if (!hidden) { hidden = true; l.classList.add('done'); } }
    window.addEventListener('load', function () { setTimeout(hide, 600); });
    if (document.readyState === 'complete') setTimeout(hide, 600);
    setTimeout(hide, 2000);
  })();

  // ---- Nav + progress + totop ----
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var toTop = document.getElementById('toTop');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', y > 60);
    if (toTop) toTop.classList.toggle('show', y > 700);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    updateParallax();
  }

  // ---- Mobile menu ----
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }

  // ---- Reveal ----
  function observeReveals(scope) {
    var reveals = (scope || document).querySelectorAll('[data-reveal]:not(.in)');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else { reveals.forEach(function (el) { el.classList.add('in'); }); }
  }

  // ---- Parallax ----
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function updateParallax() {
    if (reduce) return;
    var pEls = document.querySelectorAll('[data-parallax]');
    if (!pEls.length) return;
    var vh = window.innerHeight;
    pEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var speed = parseFloat(el.dataset.parallax) || 0.1;
      var offset = (r.top + r.height / 2 - vh / 2);
      el.style.transform = 'scale(1.12) translate3d(0,' + (-offset * speed) + 'px,0)';
    });
  }

  // ---- Counters ----
  function animateCount(el) {
    var target = +el.dataset.count, dur = 1700, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('bg-BG');
      if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString('bg-BG');
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.6 });
      document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });
    } else {
      document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = (+el.dataset.count).toLocaleString('bg-BG'); });
    }
  }

  // ---- Lightbox ----
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbCap = document.getElementById('lightboxCap');
  var lbClose = document.getElementById('lightboxClose');
  function openLightbox(src, cap) {
    if (!lb) return;
    lbImg.src = src; lbImg.alt = cap || ''; lbCap.textContent = cap || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (lb) {
    lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  // ---- Helpers ----
  function escapeHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

  function cardHTML(p) {
    var img = p.image || '', price = p.price ? p.price : 'по запитване';
    return '' +
      '<article class="card" data-reveal data-img="' + escapeAttr(img) + '" data-cap="' + escapeAttr(p.title) + '" tabindex="0" role="button" aria-label="' + escapeAttr(p.title) + ' — уголеми">' +
        '<div class="card__media"><img src="' + escapeAttr(img) + '" alt="' + escapeAttr(p.title) + '" loading="lazy" /></div>' +
        '<div class="card__body">' +
          (p.subcategory ? '<span class="card__cat">' + escapeHtml(p.subcategory) + '</span>' : '') +
          '<h3 class="card__title">' + escapeHtml(p.title) + '</h3>' +
          (p.desc ? '<p class="card__desc">' + escapeHtml(p.desc) + '</p>' : '') +
          '<div class="card__foot"><span class="card__price">' + escapeHtml(price) + '</span>' +
          '<a class="card__more" href="kontakti.html">Запитай →</a></div>' +
        '</div>' +
      '</article>';
  }
  function bindCards(scope) {
    scope.querySelectorAll('.card').forEach(function (card) {
      function open(e) {
        if (e.target.closest('.card__more')) return; // линкът към контакти да работи
        openLightbox(card.dataset.img, card.dataset.cap);
      }
      card.addEventListener('click', open);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(card.dataset.img, card.dataset.cap); }
      });
    });
  }

  // =========================================================
  //  Страница на направление — продукти по подкатегории
  // =========================================================
  var catId = document.body.dataset.catalog;
  if (catId) {
    var host = document.getElementById('directionProducts');
    fetch('data/products.json', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var cat = (d.categories || []).find(function (c) { return c.id === catId; }) || { subcategories: [] };
        var items = (d.products || []).filter(function (p) { return p.category === catId; });
        var subs = cat.subcategories && cat.subcategories.length
          ? cat.subcategories
          : items.map(function (p) { return p.subcategory; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; });

        var html = '';
        subs.forEach(function (sub) {
          var group = items.filter(function (p) { return p.subcategory === sub; });
          if (!group.length) return;
          var id = 'sub-' + sub.replace(/\s+/g, '-');
          html += '<div class="subsec" id="' + escapeAttr(id) + '">' +
            '<h2 class="subsec__title reveal" data-reveal>' + escapeHtml(sub) + '</h2>' +
            '<div class="grid">' + group.map(cardHTML).join('') + '</div></div>';
        });

        if (!html) {
          host.innerHTML = '<p class="catalog__empty">Скоро ще добавим продукти в това направление. Свържете се с нас за наличности.</p>';
        } else {
          host.innerHTML = html;
        }

        // навигация по подкатегории (чипове)
        var chipsHost = document.getElementById('subChips');
        if (chipsHost) {
          var present = subs.filter(function (sub) { return items.some(function (p) { return p.subcategory === sub; }); });
          chipsHost.innerHTML = present.map(function (sub) {
            return '<a class="chip" href="#sub-' + escapeAttr(sub.replace(/\s+/g, '-')) + '">' + escapeHtml(sub) + '</a>';
          }).join('');
        }

        observeReveals(host);
        bindCards(host);
      })
      .catch(function () {
        host.innerHTML = '<p class="catalog__empty">Каталогът не може да се зареди в момента.</p>';
      });
  }

  // =========================================================
  //  Начало — кратък преглед на акцентите (по желание)
  // =========================================================
  var featHost = document.getElementById('featuredProducts');
  if (featHost) {
    fetch('data/products.json', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var feat = (d.products || []).filter(function (p) { return p.featured; }).slice(0, 4);
        if (!feat.length) feat = (d.products || []).slice(0, 4);
        featHost.innerHTML = feat.map(cardHTML).join('');
        observeReveals(featHost);
        bindCards(featHost);
      })
      .catch(function () {});
  }

  // ---- Year ----
  function setYear() { var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); }

  // ---- Form (на страница Контакти) ----
  var form = document.getElementById('quoteForm');
  if (form) {
    var note = document.getElementById('formNote');
    var btn = form.querySelector('button[type="submit"]');
    var btnText = btn ? btn.textContent : '';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim(), phone = form.phone.value.trim(), type = form.type.value;
      function fail(m) { note.className = 'form__note err'; note.textContent = m; }
      if (name.length < 2) return fail('Моля, въведете вашето име.');
      if (!/^[0-9+()\s-]{6,}$/.test(phone)) return fail('Моля, въведете валиден телефон.');
      if (!type) return fail('Моля, изберете направление.');
      note.className = 'form__note'; note.textContent = 'Изпращане…';
      if (btn) { btn.disabled = true; btn.textContent = 'Изпращане…'; }
      fetch(form.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok && (res.d.success === true || res.d.success === undefined)) {
            note.className = 'form__note ok';
            note.textContent = 'Благодарим! Получихме запитването Ви и ще се свържем възможно най-скоро.';
            form.reset();
          } else { fail('Възникна грешка. Моля, обадете ни се директно.'); }
        })
        .catch(function () { fail('Възникна грешка с връзката. Моля, обадете ни се директно.'); })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btnText; } });
    });
  }

  // ---- Init ----
  observeReveals(document);
  initCounters();
  setYear();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { updateParallax(); });
  onScroll();
})();
