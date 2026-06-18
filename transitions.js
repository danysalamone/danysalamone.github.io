/* transitions.js — Daniel Salamone Portfolio */
(function () {

  // ============================================================
  //  FIX PAGINA NERA SU BACK/FORWARD (bfcache)
  //  Ripristina opacità e transizioni appena lo script viene eseguito
  // ============================================================
  document.body.style.opacity = '1';
  document.body.style.transform = 'none';
  document.body.style.transition = 'none';
  setTimeout(function () {
    document.body.style.transition = '';
  }, 50);

  // ============================================================
  //  1. REVEAL
  // ============================================================
  function revealAll() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(function () {
        el.classList.add('visible');
      }, 60 + delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealAll);
  } else {
    revealAll();
  }

  // ============================================================
  //  2. TRANSIZIONE PAGINE (solo per link interni)
  // ============================================================
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    if (e.target.closest('.project-list-item')) return;

    var href = link.getAttribute('href');
    if (!href) return;
    if (
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('#') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      href.startsWith('whatsapp')
    ) return;

    e.preventDefault();
    document.body.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(-8px)';
    setTimeout(function () {
      window.location.href = href;
    }, 270);
  });

  // ============================================================
  //  3. MODALE DOWNLOAD
  // ============================================================
  var modalHTML = `
    <div class="modal-overlay" id="downloadModal">
      <div class="modal-box">
        <h3>📦 Download project</h3>
        <p>Do you want to download the compressed folder for this project?</p>
        <div class="modal-actions">
          <button class="btn-confirm" id="modalConfirm">Yes, download</button>
          <button class="btn-cancel" id="modalCancel">Cancel</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  var modal = document.getElementById('downloadModal');
  var confirmBtn = document.getElementById('modalConfirm');
  var cancelBtn = document.getElementById('modalCancel');
  var currentProject = null;

  function openModal(projectId) {
    currentProject = projectId;
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
    currentProject = null;
  }

  function triggerDownload(projectId) {
    alert('Downloading "' + projectId + '" project folder… (simulated)');
    closeModal();
  }

  confirmBtn.addEventListener('click', function () {
    if (currentProject) {
      triggerDownload(currentProject);
    } else {
      closeModal();
    }
  });

  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  document.querySelectorAll('.project-list-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      var projectId = item.getAttribute('data-project') || 'project';
      openModal(projectId);
    });
  });

  // ============================================================
  //  4. SCROLL: HEADER, BACK-TO-TOP (con timer 2 secondi), PROGRESS BAR
  // ============================================================
  var header = document.querySelector('nav');
  var backBtn = document.getElementById('backToTop');
  var progressBar = document.querySelector('.scroll-progress');
  var ticking = false;
  var hideTimer = null;

  function handleScroll() {
    var scrollY = window.scrollY;

    // Header
    if (scrollY > 80) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    // Back to top
    if (scrollY > 300) {
      backBtn.classList.remove('hiding');
      backBtn.classList.add('visible');

      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      hideTimer = setTimeout(function () {
        backBtn.classList.add('hiding');
        setTimeout(function () {
          backBtn.classList.remove('visible', 'hiding');
        }, 300);
        hideTimer = null;
      }, 2000);
    } else {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      backBtn.classList.remove('visible', 'hiding');
    }

    // Progress bar
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      backBtn.classList.add('hiding');
      setTimeout(function () {
        backBtn.classList.remove('visible', 'hiding');
      }, 300);
    });
  }

  // ============================================================
  //  5. HAMBURGER MENU
  // ============================================================
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  //  6. TEMA DARK / LIGHT
  // ============================================================
  (function themeManager() {
    var html = document.documentElement;
    var themeBtn = document.querySelector('.theme-toggle');

    function getPreferredTheme() {
      var saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
      }
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var current = html.getAttribute('data-theme') || 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    var initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  })();

  // ============================================================
  //  7. FIX DEFINITIVO PER IL PULSANTE "INDIETRO" (pageshow)
  // ============================================================
  window.addEventListener('pageshow', function (event) {
    // Se la pagina viene caricata dalla cache (back/forward), resetta tutto
    document.body.style.opacity = '1';
    document.body.style.transform = 'none';
    document.body.style.transition = 'none';
    setTimeout(function () {
      document.body.style.transition = '';
    }, 50);
  });

  // ============================================================
  //  Inizializza lo stato dello scroll al caricamento
  // ============================================================
  setTimeout(handleScroll, 100);

})();
