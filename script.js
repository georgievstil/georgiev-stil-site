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
      '<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Снимка в цял екран">' +
        '<button class="lightbox__close" id="lightboxClose" aria-label="Затвори">×</button>' +
        '<button class="lightbox__nav lightbox__nav--prev" id="lightboxPrev" aria-label="Предишна снимка">‹</button>' +
        '<button class="lightbox__nav lightbox__nav--next" id="lightboxNext" aria-label="Следваща снимка">›</button>' +
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
  // страници без тъмен банер отгоре — менюто е винаги в светлия (четим) вид
  var solidNav = document.body.dataset.nav === 'solid';
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', solidNav || y > 60);
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

  // ---- Lightbox (една снимка или поредица със стрелки) ----
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbCap = document.getElementById('lightboxCap');
  var lbClose = document.getElementById('lightboxClose');
  var lbPrev = document.getElementById('lightboxPrev');
  var lbNext = document.getElementById('lightboxNext');
  var lbSet = [], lbIndex = 0, lbTitle = '', lbOnChange = null, lbReturnFocus = null;
  function lbShow(i) {
    var n = lbSet.length;
    lbIndex = ((i % n) + n) % n;
    lbImg.src = lbSet[lbIndex];
    lbImg.alt = lbTitle;
    lbCap.innerHTML = escapeHtml(lbTitle) + (n > 1 ? '<small>' + (lbIndex + 1) + ' от ' + n + '</small>' : '');
    if (lbOnChange) lbOnChange(lbIndex);
  }
  function openLightbox(set, index, title, onChange) {
    if (!lb || !set || !set.length) return;
    lbSet = set; lbTitle = title || ''; lbOnChange = onChange || null;
    lbReturnFocus = document.activeElement;
    lb.classList.toggle('is-single', set.length < 2);
    lbShow(index || 0);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }
  function closeLightbox() {
    if (!lb || !lb.classList.contains('open')) return;
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus();
  }
  function isLightboxOpen() { return !!lb && lb.classList.contains('open'); }
  // плъзгане с пръст наляво/надясно (телефон)
  function onSwipe(el, cb) {
    var x0 = null, y0 = 0;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) cb(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
  if (lb) {
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function () { lbShow(lbIndex - 1); });
    lbNext.addEventListener('click', function () { lbShow(lbIndex + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    onSwipe(lb, function (dir) { if (lbSet.length > 1) lbShow(lbIndex + dir); });
    document.addEventListener('keydown', function (e) {
      if (!isLightboxOpen()) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft' && lbSet.length > 1) lbShow(lbIndex - 1);
      else if (e.key === 'ArrowRight' && lbSet.length > 1) lbShow(lbIndex + 1);
    });
  }

  // ---- Helpers ----
  function escapeHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

  // ---- Каталог: общи помощници ----
  function loadCatalog() {
    return fetch('data/products.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) {
        d.products = withSlugs(d.products || []);
        d.categories = d.categories || [];
        return d;
      });
  }

  // Адрес на продукта от заглавието: „Холов ъгъл Мелиса“ → holov-agal-melisa
  var TRANSLIT = { 'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sht','ъ':'a','ь':'y','ю':'yu','я':'ya' };
  function slugify(s) {
    var out = String(s || '').toLowerCase().split('').map(function (ch) {
      return TRANSLIT.hasOwnProperty(ch) ? TRANSLIT[ch] : ch;
    }).join('');
    if (out.normalize) out = out.normalize('NFD').replace(/[̀-ͯ]/g, '');
    return out.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'produkt';
  }
  // еднакви заглавия получават -2, -3… (редът е този от каталога, затова е еднакъв на всяка страница)
  function withSlugs(products) {
    var seen = {};
    products.forEach(function (p) {
      var base = slugify(p.title), slug = base, n = 2;
      while (seen[slug]) slug = base + '-' + (n++);
      seen[slug] = true;
      p._slug = slug;
    });
    return products;
  }
  function productUrl(p) { return 'produkt.html?p=' + encodeURIComponent(p._slug); }
  function subAnchor(sub) { return 'sub-' + String(sub).replace(/\s+/g, '-'); }

  // основната снимка + „Още снимки“, без празни и повторени
  function productImages(p) {
    var more = Array.isArray(p.gallery) ? p.gallery : (p.gallery ? [p.gallery] : []);
    return [p.image].concat(more).filter(function (src, i, a) {
      return typeof src === 'string' && src.trim() && a.indexOf(src) === i;
    });
  }

  // карта в категорията: само снимка и заглавие, води към страницата на продукта
  function cardHTML(p) {
    var img = productImages(p)[0];
    return '' +
      '<a class="card" data-reveal href="' + escapeAttr(productUrl(p)) + '">' +
        '<div class="card__media">' + (img ? '<img src="' + escapeAttr(img) + '" alt="' + escapeAttr(p.title) + '" loading="lazy" />' : '') + '</div>' +
        '<div class="card__body"><h3 class="card__title">' + escapeHtml(p.title) + '</h3></div>' +
      '</a>';
  }

  // запомня докъде е стигнал човек в категорията, за да го върне там с „Назад“
  var SCROLL_KEY = 'gs-scroll:' + location.pathname;
  function rememberScroll(scope) {
    scope.addEventListener('click', function (e) {
      if (!e.target.closest('a.card')) return;
      try { sessionStorage.setItem(SCROLL_KEY, String(window.scrollY || window.pageYOffset)); } catch (err) {}
    });
  }
  function restoreScroll() {
    var entry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    var y = null;
    try { y = sessionStorage.getItem(SCROLL_KEY); } catch (err) {}
    if (entry && entry.type === 'back_forward' && y !== null) { window.scrollTo(0, +y); return true; }
    return false;
  }

  // =========================================================
  //  Страница на направление — продукти по подкатегории
  // =========================================================
  var catId = document.body.dataset.catalog;
  if (catId) {
    var host = document.getElementById('directionProducts');
    loadCatalog()
      .then(function (d) {
        var cat = d.categories.find(function (c) { return c.id === catId; }) || { subcategories: [] };
        var items = d.products.filter(function (p) { return p.category === catId; });
        // подкатегориите от направлението + такива, които ги има само в продуктите
        var subs = (cat.subcategories || []).concat(items.map(function (p) { return p.subcategory || 'Други'; }))
          .filter(function (v, i, a) { return v && a.indexOf(v) === i; });

        var html = '';
        subs.forEach(function (sub) {
          var group = items.filter(function (p) { return (p.subcategory || 'Други') === sub; });
          if (!group.length) return;
          var id = subAnchor(sub);
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
          var present = subs.filter(function (sub) { return items.some(function (p) { return (p.subcategory || 'Други') === sub; }); });
          chipsHost.innerHTML = present.map(function (sub) {
            return '<a class="chip" href="#' + escapeAttr(subAnchor(sub)) + '">' + escapeHtml(sub) + '</a>';
          }).join('');
        }

        observeReveals(host);
        rememberScroll(host);
        // връщане с „Назад“ от продукт → същото място; линк към подкатегория (#sub-…) → към нея
        if (!restoreScroll() && location.hash) {
          var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
          if (target) target.scrollIntoView();
        }
      })
      .catch(function () {
        host.innerHTML = '<p class="catalog__empty">Каталогът не може да се зареди в момента. Обадете ни се на ' + SITE.phone1 + '.</p>';
      });
  }

  // =========================================================
  //  Начало — кратък преглед на акцентите (по желание)
  // =========================================================
  var featHost = document.getElementById('featuredProducts');
  if (featHost) {
    loadCatalog()
      .then(function (d) {
        var feat = d.products.filter(function (p) { return p.featured; }).slice(0, 4);
        if (!feat.length) feat = d.products.slice(0, 4);
        featHost.innerHTML = feat.map(cardHTML).join('');
        observeReveals(featHost);
      })
      .catch(function () {});
  }

  // =========================================================
  //  Страница на продукт (produkt.html?p=…)
  // =========================================================
  var productHost = document.getElementById('productView');
  if (productHost) {
    var wanted = new URLSearchParams(location.search).get('p') || '';
    loadCatalog()
      .then(function (d) {
        var p = d.products.find(function (x) { return x._slug === wanted; });
        if (!p) { renderMissing(); return; }
        var cat = d.categories.find(function (c) { return c.id === p.category; }) || { id: '', name: '' };
        renderProduct(p, cat, d.products);
      })
      .catch(function () {
        productHost.innerHTML = '<p class="catalog__empty">Продуктът не може да се зареди в момента. Обадете ни се на ' +
          '<a href="tel:' + SITE.phone1tel + '">' + SITE.phone1 + '</a>.</p>';
      });
  }

  function renderMissing() {
    document.title = 'Продуктът не е намерен — Георгиев Стил';
    productHost.innerHTML =
      '<div class="pmissing">' +
        '<h1>Този продукт вече не е в каталога</h1>' +
        '<p>Може да е преименуван или вече да не се предлага. Разгледайте мебелите или ни се обадете.</p>' +
        '<div class="pmissing__actions"><a class="btn btn--solid" href="mebeli.html">Към мебелите</a>' +
        '<a class="link-arrow" href="tel:' + SITE.phone1tel + '">' + SITE.phone1 + '</a></div>' +
      '</div>';
  }

  function renderProduct(p, cat, all) {
    var imgs = productImages(p);
    var catPage = cat.id ? cat.id + '.html' : 'index.html';
    var sub = p.subcategory || '';
    var price = p.price && String(p.price).trim() && !/^по запитване$/i.test(String(p.price).trim()) ? p.price : '';
    var ask = 'kontakti.html?produkt=' + encodeURIComponent(p.title) + (cat.name ? '&napravlenie=' + encodeURIComponent(cat.name) : '');

    // заглавие и описание на страницата (за таба на браузъра и при споделяне)
    document.title = p.title + ' — Георгиев Стил, Провадия';
    var plain = String(p.desc || '').replace(/\s+/g, ' ').trim();
    setMeta('description', plain ? plain.slice(0, 155) + (plain.length > 155 ? '…' : '') : p.title + ' от Георгиев Стил ЕООД, Провадия.');
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.href = 'https://www.georgievstil.com/' + productUrl(p);
    var navLink = document.querySelector('.nav__menu a[href="' + catPage + '"]');
    if (navLink) navLink.classList.add('is-active');

    var gallery = '';
    if (imgs.length) {
      gallery =
        '<div class="gallery" id="gallery">' +
          '<div class="gallery__stage">' +
            '<button type="button" class="gallery__zoom" id="galleryZoom" aria-label="Отвори снимката на цял екран">' +
              '<img id="galleryMain" src="' + escapeAttr(imgs[0]) + '" alt="' + escapeAttr(p.title) + '" />' +
            '</button>' +
            (imgs.length > 1
              ? '<button type="button" class="gallery__nav gallery__nav--prev" id="galleryPrev" aria-label="Предишна снимка">‹</button>' +
                '<button type="button" class="gallery__nav gallery__nav--next" id="galleryNext" aria-label="Следваща снимка">›</button>' +
                '<span class="gallery__count" id="galleryCount" aria-live="polite">1 от ' + imgs.length + '</span>'
              : '') +
          '</div>' +
          (imgs.length > 1
            ? '<div class="gallery__thumbs">' + imgs.map(function (src, i) {
                return '<button type="button" class="gallery__thumb' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '"' +
                  (i === 0 ? ' aria-current="true"' : '') + ' aria-label="Снимка ' + (i + 1) + ' от ' + imgs.length + '">' +
                  '<img src="' + escapeAttr(src) + '" alt="" loading="lazy" /></button>';
              }).join('') + '</div>'
            : '') +
        '</div>';
    }

    var related = all.filter(function (x) { return x !== p && x.category === p.category && (x.subcategory || '') === sub; });
    var at = all.indexOf(p);
    // първо следващите след текущия, после от началото — така всеки продукт показва различни „съседи“
    related.sort(function (a, b) {
      var ia = all.indexOf(a), ib = all.indexOf(b);
      return ((ia - at + all.length) % all.length) - ((ib - at + all.length) % all.length);
    });
    related = related.slice(0, 3);

    productHost.innerHTML =
      '<nav class="crumbs crumbs--dark" aria-label="Къде се намирате">' +
        '<a href="index.html">Начало</a><span>/</span>' +
        (cat.name ? '<a href="' + catPage + '">' + escapeHtml(cat.name) + '</a><span>/</span>' : '') +
        (sub ? '<a href="' + catPage + '#' + escapeAttr(subAnchor(sub)) + '">' + escapeHtml(sub) + '</a>' : '') +
      '</nav>' +
      '<div class="product">' +
        gallery +
        '<div class="product__info">' +
          '<h1 class="product__title">' + escapeHtml(p.title) + '</h1>' +
          '<p class="product__price">' + (price ? escapeHtml(price) : 'Цена по запитване') + '</p>' +
          '<div class="product__actions">' +
            '<a class="btn btn--solid" href="' + escapeAttr(ask) + '">Изпрати запитване</a>' +
            '<a class="product__call" href="tel:' + SITE.phone1tel + '">или се обадете: <b>' + SITE.phone1 + '</b></a>' +
          '</div>' +
          (p.desc ? '<div class="pdesc">' + formatDesc(p.desc) + '</div>' : '') +
        '</div>' +
      '</div>' +
      (related.length
        ? '<section class="related">' +
            '<div class="related__head"><h2>Още от „' + escapeHtml(sub || cat.name) + '“</h2>' +
            '<a class="link-arrow" href="' + catPage + (sub ? '#' + escapeAttr(subAnchor(sub)) : '') + '">Виж всички</a></div>' +
            '<div class="grid">' + related.map(cardHTML).join('') + '</div>' +
          '</section>'
        : '');

    observeReveals(productHost);
    if (imgs.length) bindGallery(imgs, p.title);
  }

  function bindGallery(imgs, title) {
    var main = document.getElementById('galleryMain');
    var count = document.getElementById('galleryCount');
    var thumbs = productHost.querySelectorAll('.gallery__thumb');
    var cur = 0;
    function show(i) {
      var n = imgs.length;
      cur = ((i % n) + n) % n;
      if (main.getAttribute('src') !== imgs[cur]) {
        main.classList.add('is-swapping');
        main.onload = main.onerror = function () { main.classList.remove('is-swapping'); };
        main.src = imgs[cur];
      }
      if (count) count.textContent = (cur + 1) + ' от ' + n;
      thumbs.forEach(function (t, k) {
        t.classList.toggle('is-active', k === cur);
        if (k === cur) { t.setAttribute('aria-current', 'true'); } else { t.removeAttribute('aria-current'); }
      });
      // на телефон миниатюрите са в лента — активната да се вижда
      var strip = thumbs[cur] && thumbs[cur].parentNode;
      if (strip && strip.scrollWidth > strip.clientWidth) {
        strip.scrollTo({ left: thumbs[cur].offsetLeft - 40, behavior: reduce ? 'auto' : 'smooth' }); // лентата е position:relative
      }
      if (n > 1) { var pre = new Image(); pre.src = imgs[(cur + 1) % n]; } // следващата да е готова
    }
    document.getElementById('galleryZoom').addEventListener('click', function () {
      openLightbox(imgs, cur, title, show);
    });
    if (imgs.length < 2) return;
    document.getElementById('galleryPrev').addEventListener('click', function () { show(cur - 1); });
    document.getElementById('galleryNext').addEventListener('click', function () { show(cur + 1); });
    thumbs.forEach(function (t) { t.addEventListener('click', function () { show(+t.dataset.i); }); });
    onSwipe(productHost.querySelector('.gallery__stage'), function (dir) { show(cur + dir); });
    document.addEventListener('keydown', function (e) {
      if (isLightboxOpen() || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '')) return;
      if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
    });
    show(0);
  }

  // Описанието идва като обикновен текст от панела (често копиран от сайт на доставчик). Подреждаме го:
  //  „Размери:“ (ред, завършващ на двоеточие)  → подзаглавие
  //  „• …“, „- …“, „✔ …“                      → точка от списък
  //  „Обща дължина: 230 см“                    → ред с размер/характеристика (празните редове между такива се прескачат)
  //  поредица от кратки редове                 → списък; дълъг текст → абзац
  function formatDesc(text) {
    var tokens = String(text).replace(/\r\n?/g, '\n').split('\n').map(function (raw) {
      var s = raw.trim();
      if (!s) return { t: 'gap' };
      var bullet = s.match(/^(?:[•●▪◦‣✔✓☑✅➤►▶→]️?\s*|[-–—*·]\s+)(.+)$/);
      if (bullet) return { t: 'li', s: bullet[1] };
      if (/:$/.test(s) && s.length <= 48) return { t: 'h', s: s.replace(/\s*:$/, '') };
      if (s.length <= 110 && /^[^:]{1,40}:\s*\S/.test(s)) return { t: 'kv', s: s };
      return { t: s.length <= 130 ? 'short' : 'p', s: s };
    });
    function nextReal(i) { for (var j = i + 1; j < tokens.length; j++) if (tokens[j].t !== 'gap') return tokens[j]; return { t: 'end' }; }
    // „✔ Диван тройка“, последван от размери → подзаглавие на тези размери
    tokens.forEach(function (tok, i) { if (tok.t === 'li' && tok.s.indexOf(':') < 0 && nextReal(i).t === 'kv') tok.t = 'h'; });

    var html = '', inList = false, last = '';
    function open() { if (!inList) { html += '<ul>'; inList = true; } }
    function close() { if (inList) { html += '</ul>'; inList = false; } }
    function kv(s) { var k = s.indexOf(':'); return '<span class="pdesc__k">' + escapeHtml(s.slice(0, k + 1)) + '</span> ' + escapeHtml(s.slice(k + 1).trim()); }
    tokens.forEach(function (tok, i) {
      if (tok.t === 'gap') {
        if (!(inList && last === 'kv' && nextReal(i).t === 'kv')) close();
        return;
      }
      var next = tokens[i + 1] || { t: 'gap' };
      if (tok.t === 'h') { close(); html += '<h3>' + escapeHtml(tok.s) + '</h3>'; }
      else if (tok.t === 'kv') { open(); html += '<li>' + kv(tok.s) + '</li>'; }
      else if (tok.t === 'li' || (tok.t === 'short' && (inList || last === 'h' || /^(short|li|kv)$/.test(next.t)))) {
        open(); html += '<li>' + escapeHtml(tok.s) + '</li>';
      } else { close(); html += '<p>' + escapeHtml(tok.s) + '</p>'; }
      last = tok.t;
    });
    close();
    return html;
  }

  function setMeta(name, content) {
    var m = document.querySelector('meta[name="' + name + '"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', name); document.head.appendChild(m); }
    m.setAttribute('content', content);
  }

  // ---- Year ----
  function setYear() { var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); }

  // ---- Form (на страница Контакти) ----
  var form = document.getElementById('quoteForm');
  if (form) {
    // дошли от „Изпрати запитване“ на продукт → попълваме за кой продукт става дума
    var qs = new URLSearchParams(location.search);
    var askProduct = qs.get('produkt'), askType = qs.get('napravlenie');
    if (askProduct) {
      if (form.message && !form.message.value) form.message.value = 'Здравейте, интересувам се от „' + askProduct + '“.';
      var hidden = document.createElement('input');
      hidden.type = 'hidden'; hidden.name = 'product'; hidden.value = askProduct;
      form.appendChild(hidden);
    }
    if (askType && form.type) {
      Array.prototype.forEach.call(form.type.options, function (o) { if (o.text === askType) form.type.value = o.value || o.text; });
    }
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
