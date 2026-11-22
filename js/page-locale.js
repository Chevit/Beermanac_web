/**
 * Locale handling, modelled on daily-rune-site.
 * Home pages are separate files (/ for English, /uk/ for Ukrainian) and their
 * toggle is a plain link. Subpages (support, privacy, terms) hold both languages
 * in [data-lang] blocks and switch in place.
 * Priority on subpages: ?locale= → saved choice → browser language → 'en'.
 */
(function () {
  var KEY = 'locale';

  function normalize(value) {
    if (!value) return null;
    value = String(value).toLowerCase();
    if (value === 'ua' || value.indexOf('uk') === 0) return 'uk';
    if (value.indexOf('en') === 0) return 'en';
    return null;
  }

  function load() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(locale) {
    try { localStorage.setItem(KEY, locale); } catch (e) { /* private mode */ }
  }

  // Home pages: remember the choice when the visitor switches language.
  document.querySelectorAll('a.locale-btn').forEach(function (link) {
    link.addEventListener('click', function () { save(link.dataset.locale); });
  });
  var pageLocale = document.body.dataset.pageLocale;
  if (pageLocale) {
    save(pageLocale);
    return;
  }

  // Subpages: switch blocks in place.
  var blocks = document.querySelectorAll('[data-lang]');
  if (!blocks.length) return;

  var params = new URLSearchParams(window.location.search);
  var initial = normalize(params.get('locale')) ||
                normalize(load()) ||
                normalize(navigator.language) ||
                'en';

  function apply(locale) {
    blocks.forEach(function (el) {
      el.hidden = el.dataset.lang !== locale;
    });
    document.querySelectorAll('button.locale-btn').forEach(function (btn) {
      var on = btn.dataset.locale === locale;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.documentElement.lang = locale;
    // Links back to the home page and between subpages keep the language.
    document.querySelectorAll('[data-home]').forEach(function (a) {
      a.href = locale === 'uk' ? 'uk/' : './';
    });
    document.querySelectorAll('[data-sub]').forEach(function (a) {
      a.href = a.dataset.sub + '?locale=' + locale;
    });
    var title = document.querySelector('meta[name="title-' + locale + '"]');
    if (title) document.title = title.content;
  }

  apply(initial);
  save(initial);

  document.querySelectorAll('button.locale-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var locale = btn.dataset.locale;
      save(locale);
      var page = document.querySelector('.page');
      if (page && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        page.style.opacity = '0.3';
        setTimeout(function () { apply(locale); page.style.opacity = ''; }, 180);
      } else {
        apply(locale);
      }
      var url = new URL(window.location.href);
      url.searchParams.set('locale', locale);
      history.replaceState(null, '', url);
    });
  });
})();
