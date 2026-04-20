document.addEventListener('DOMContentLoaded', function () {
  try {
    var current = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll(
      '.navbar .nav-link[href], .offcanvas .nav-link[href], .offcanvas .dropdown-item[href], .site-footer a[href]'
    ).forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('#') === 0 || href.indexOf('http') === 0) return;
      var file = href.replace(/^\.\//, '');
      if (file === current || href === current) {
        a.classList.add('active');
      }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var sel = this.getAttribute('href');
        var target = sel ? document.querySelector(sel) : null;
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.card, .lead, .btn:not(.navbar-toggler), .fade-up').forEach(function (el) {
      el.classList.add('fade-up');
      observer.observe(el);
    });

    document.querySelectorAll('.offcanvas .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        var off = document.querySelector('.offcanvas.show');
        if (off && typeof bootstrap !== 'undefined') {
          var bs = bootstrap.Offcanvas.getInstance(off);
          if (bs) bs.hide();
        }
      });
    });
    // Toggle auth-specific UI (index page uses signed-in / signed-out classes)
    function applyAuthUI() {
      var signedIn = localStorage.getItem('signedIn') === 'true';
      document.querySelectorAll('.signed-in').forEach(function (el) {
        if (signedIn) el.classList.remove('d-none');
        else el.classList.add('d-none');
      });
      document.querySelectorAll('.signed-out').forEach(function (el) {
        if (signedIn) el.classList.add('d-none');
        else el.classList.remove('d-none');
      });
    }
    applyAuthUI();
  } catch (err) {
    console.warn('site.js error', err);
  }
});
