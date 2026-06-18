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
    // If the click is inside a .project-list-item, let the item handler deal with it
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

  /* 3. Download confirmation modal for project-list-item clicks */
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
    // Simulate download — in reality you'd redirect to a zip file URL
    // For demo, we show an alert and close the modal
    alert('Downloading "' + projectId + '" project folder… (simulated)');
    closeModal();
    // In production, you would do: window.location.href = '/downloads/' + projectId + '.zip';
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

  // Attach click handlers to all .project-list-item elements
  document.querySelectorAll('.project-list-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      // If the click is on a link inside the item, let the link handle it
      if (e.target.closest('a')) return;
      var projectId = item.getAttribute('data-project') || 'project';
      openModal(projectId);
    });
  });

})();
