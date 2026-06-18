/* transitions.js — Daniel Salamone Portfolio */
(function () {

  // 1. REVEAL
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

  // 2. TRANSIZIONE PAGINE
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

  // 3. MODALE DOWNLOAD
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

  // 4. SCROLL: HEADER, BACK-TO-TOP (con timer 2 secondi), PROGRESS BAR
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

    // Back to top con timer di 2 secondi dopo lo stop
    if (scrollY > 300) {
      // Mostra la freccia (se già visibile, rimuovi eventuale stato di nascondimento)
      backBtn.classList.remove('hiding');
      backBtn.classList.add('visible');

      // Cancella il timer precedente e riavvia il conto alla rovescia di 2 secondi
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      hideTimer = setTimeout(function () {
        // Dopo 2 secondi di inattività, nascondi la freccia
        backBtn.classList.add('hiding');
        setTimeout(function () {
          backBtn.classList.remove('visible', 'hiding');
        }, 300);
        hideTimer = null;
      }, 2000);
    } else {
      // Sotto 300px: nascondi subito e cancella il timer
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

  // Throttle con requestAnimationFrame
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Quando l'utente clicca sulla freccia, torna su e nasconde la freccia subito
  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Cancella il timer e nasconde subito la freccia
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    backBtn.classList.add('hiding');
    setTimeout(function () {
      backBtn.classList.remove('visible', 'hiding');
    }, 300);
  });

  // 5. HAMBURGER MENU
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

  // 6. TEMA DARK / LIGHT
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

  // Inizializza lo stato dello scroll al caricamento
  setTimeout(handleScroll, 100);

})();
