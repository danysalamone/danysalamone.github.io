/* transitions.js — Daniel Salamone Portfolio */
(function () {

  /* 1. Reveal elements on load + scroll */
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

  /* 2. Page-out transition on internal links (skip project-list-item clicks) */
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

  /* 3. Download confirmation modal */
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

  /* 4. Header hide/show on scroll + Back to Top button */
  var header = document.querySelector('nav');
  var backBtn = document.createElement('button');
  backBtn.id = 'backToTop';
  backBtn.setAttribute('aria-label', 'Torna su');
  backBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  `;
  document.body.appendChild(backBtn);

  var lastScrollY = window.scrollY;
  var ticking = false;

  function handleScroll() {
    var currentScrollY = window.scrollY;

    // Header
    if (currentScrollY > 80) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    // Back to top button
    if (currentScrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
    ticking = false;
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

  // Click on back button scrolls to top
  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initialize state on load
  setTimeout(function () {
    handleScroll();
  }, 100);

})();
