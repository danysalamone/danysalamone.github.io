/* transitions.js — Daniel Salamone Portfolio */
(function () {

  // 1. Reveal
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

  // 2. Transizioni pagine
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

  // 3. Modale download
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

  // 4. Scroll: header, back-to-top, progress bar
  var header = document.querySelector('nav');
  var backBtn = document.getElementById('backToTop');
  var progressBar = document.querySelector('.scroll-progress');
  var ticking = false;

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
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
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

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 5. Hamburger menu
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
      navLinks.classList.toggle('open');
    });
    // Chiudi menu cliccando su un link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 6. Tema (dark/light)
  var themeBtn = document.querySelector('.theme-toggle');
  var root = document.documentElement;
  var storedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', storedTheme);
  if (themeBtn) {
    themeBtn.textContent = storedTheme === 'dark' ? '🌙' : '☀️';
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.textContent = next === 'dark' ? '🌙' : '☀️';
    });
  }

  // 7. Form contatto (simulazione invio)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Messaggio inviato (simulazione) – Grazie!');
      this.reset();
    });
  }

  // Inizializza stato scroll al caricamento
  setTimeout(handleScroll, 100);

})();
