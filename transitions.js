/* transitions.js — Daniel Salamone Portfolio */

(function() {
  // ============================================================
  //  PAGE LOAD
  // ============================================================
  document.body.style.opacity = '1';
  document.body.style.transform = 'none';
  document.body.style.transition = 'none';
  setTimeout(function() {
    document.body.style.transition = '';
  }, 50);

  // ============================================================
  //  REVEAL
  // ============================================================
  function revealAll() {
    document.querySelectorAll('.reveal').forEach(function(el) {
      var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(function() {
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
  //  PAGES TRANSITION (con fix per il back)
  // ============================================================
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    if (link.hasAttribute('download')) return;
    if (e.target.closest('.project-list-item')) return;
    if (e.target.closest('.download-project-btn')) return;

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
    setTimeout(function() {
      window.location.href = href;
    }, 270);
  });

  // ============================================================
  //  FIX PULSANTE INDIETRO (blocca schermata nera)
  // ============================================================
  window.addEventListener('pageshow', function(event) {
    // Forza il reset della visibilità
    document.body.style.opacity = '1';
    document.body.style.transform = 'none';
    document.body.style.transition = 'none';
    setTimeout(function() {
      document.body.style.transition = '';
    }, 50);

    // Riavvio le animazioni reveal
    document.querySelectorAll('.reveal').forEach(function(el) {
      // Se l'elemento non è già visibile, riavvia l'animazione
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  });

  // ============================================================
  //  SCROLL
  // ============================================================
  var header = document.querySelector('nav');
  var backBtn = document.getElementById('backToTop');
  var progressBar = document.querySelector('.scroll-progress');
  var ticking = false;
  var hideTimer = null;

  function handleScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 80) {
      header.classList.add('hidden');
      if (progressBar) progressBar.style.top = '0';
    } else {
      header.classList.remove('hidden');
      if (progressBar) progressBar.style.top = '64px';
    }

    if (scrollY > 300) {
      backBtn.classList.remove('hiding');
      backBtn.classList.add('visible');

      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      hideTimer = setTimeout(function() {
        backBtn.classList.add('hiding');
        setTimeout(function() {
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

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  if (backBtn) {
    backBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      backBtn.classList.add('hiding');
      setTimeout(function() {
        backBtn.classList.remove('visible', 'hiding');
      }, 300);
    });
  }

  // ============================================================
  //  HAMBURGER MENU
  // ============================================================
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  //  DARK/LIGHT THEME TOGGLE
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
      themeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        var current = html.getAttribute('data-theme') || 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    var initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  })();

  // ============================================================
  //  CV DOWNLOAD CONSENT (da Google Drive)
  // ============================================================
  (function cvConsentManager() {
    var GOOGLE_DRIVE_CV_URL = "https://drive.google.com/file/d/1r7nCSg9AXsQ6KAMxKfqDeN6FergYBl8L/view?usp=sharing";
    var cvModalHTML = `
      <div class="modal-overlay" id="cvConsentModal">
        <div class="modal-box" id="cvConsentBox">
          <div class="cv-consent-text">
            <div class="cv-consent-title" tabindex="-1">CONFIDENTIALITY AND DATA PROTECTION NOTICE</div>
            <p>By downloading, accessing, reviewing, retaining, or otherwise using this Curriculum Vitae, you acknowledge and agree that all personal information contained herein is confidential and is provided exclusively for the purpose of evaluating my professional qualifications, experience, skills, and suitability for employment, consulting, collaboration, or business opportunities.</p>
            <p>The recipient shall not, without my prior written consent, copy, reproduce, distribute, publish, disclose, transfer, sell, share with third parties, store in external databases, or otherwise process any personal information contained in this document for purposes other than the legitimate evaluation of my professional profile.</p>
            <p>Any processing of personal data contained in this CV must be carried out in compliance with applicable data protection and privacy laws, including, where applicable, Regulation (EU) 2016/679 (General Data Protection Regulation – GDPR) and related legislation.</p>
            <p>Unauthorized use, disclosure, dissemination, or retention of the information contained in this document is strictly prohibited and may constitute a violation of applicable privacy, confidentiality, and data protection laws.</p>
            <p>All intellectual property rights, privacy rights, and rights relating to my personal data are expressly reserved. Receipt or access to this CV does not grant any license, authorization, or right to use the information contained herein beyond the purpose expressly stated above.</p>
          </div>
          <div class="cv-consent-check">
            <input type="checkbox" id="cvConsentCheck">
            <label for="cvConsentCheck">I have read and agree to the terms.</label>
          </div>
          <div class="modal-actions">
            <button class="btn-confirm" id="cvDownloadBtn" disabled>Open CV</button>
            <button class="btn-cancel" id="cvCancelBtn">Cancel</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cvModalHTML);

    var cvModal = document.getElementById('cvConsentModal');
    var cvBox = document.getElementById('cvConsentBox');
    var cvTitle = cvBox ? cvBox.querySelector('.cv-consent-title') : null;
    var cvCheckbox = document.getElementById('cvConsentCheck');
    var cvOpenBtn = document.getElementById('cvDownloadBtn');
    var cvCancelBtn = document.getElementById('cvCancelBtn');
    var cvTrigger = document.getElementById('cvDownloadTrigger');

    cvCheckbox.addEventListener('change', function() {
      cvOpenBtn.disabled = !this.checked;
    });

    if (cvTrigger) {
      cvTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        cvModal.classList.add('active');
        cvCheckbox.checked = false;
        cvOpenBtn.disabled = true;

        if (cvBox) {
          cvBox.scrollTop = 0;
          setTimeout(function() {
            cvBox.scrollTop = 0;
          }, 50);
        }

        if (cvTitle) {
          cvTitle.focus({ preventScroll: true });
        }
      });
    }

    function closeCvModal() {
      cvModal.classList.remove('active');
      cvCheckbox.checked = false;
      cvOpenBtn.disabled = true;
      if (cvBox) {
        cvBox.scrollTop = 0;
      }
    }

    function openCvInNewTab() {
      if (typeof plausible === 'function') {
        plausible('CV_Download_Authorized');
      }
      window.open(GOOGLE_DRIVE_CV_URL, '_blank', 'noopener,noreferrer');
      closeCvModal();
    }

    cvOpenBtn.addEventListener('click', openCvInNewTab);
    cvCancelBtn.addEventListener('click', closeCvModal);
    cvModal.addEventListener('click', function(e) {
      if (e.target === cvModal) closeCvModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && cvModal.classList.contains('active')) {
        closeCvModal();
      }
    });

    cvCheckbox.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.checked = !this.checked;
        cvOpenBtn.disabled = !this.checked;
      }
    });
  })();

  // ============================================================
  //  DEVICE SELECTOR PER VIDEOGAMES (con Google Drive)
  // ============================================================
  (function deviceSelector() {
    // 🔽 SOSTITUISCI QUESTI ID CON QUELLI DEI TUOI FILE SU GOOGLE DRIVE
    // Per ogni gioco, inserisci l'ID del file Android e Windows
    var gameFiles = {
      'higherorlower': {
        android: 'https://drive.google.com/uc?export=download&id=1BHnbGupkjVRVY36hICH_8vrFMWZqKvXZ',
        windows: 'https://drive.google.com/uc?export=download&id=1kQsJTwx8Owun5CyRtU0ImxEd_XmtYWZf'
      },
      'platformer': {
        android: 'https://drive.google.com/uc?export=download&id=TODO_ANDROID_PLATFORMER',
        windows: 'https://drive.google.com/uc?export=download&id=TODO_WINDOWS_PLATFORMER'
      },
      'puzzle': {
        android: 'https://drive.google.com/uc?export=download&id=TODO_ANDROID_PUZZLE',
        windows: 'https://drive.google.com/uc?export=download&id=TODO_WINDOWS_PUZZLE'
      }
    };

    var deviceModalHTML = `
      <div class="modal-overlay" id="deviceModal">
        <div class="modal-box">
          <h3>📱 Select device</h3>
          <p>Choose the platform you want to install <strong id="deviceGameName"></strong> on:</p>
          <div class="device-options">
            <button class="device-btn" data-device="android">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <line x1="8" y1="6" x2="16" y2="6"/>
                <line x1="8" y1="10" x2="16" y2="10"/>
                <line x1="8" y1="14" x2="16" y2="14"/>
                <line x1="8" y1="18" x2="12" y2="18"/>
              </svg>
              <span class="device-label">Android <small>.apk</small></span>
            </button>
            <button class="device-btn" data-device="windows">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2"/>
                <line x1="6" y1="2" x2="6" y2="22"/>
                <line x1="18" y1="2" x2="18" y2="22"/>
                <line x1="2" y1="6" x2="22" y2="6"/>
                <line x1="2" y1="18" x2="22" y2="18"/>
              </svg>
              <span class="device-label">Windows <small>.zip</small></span>
            </button>
          </div>
          <div class="modal-actions">
            <button class="btn-cancel" id="deviceCancelBtn">Cancel</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', deviceModalHTML);

    var deviceModal = document.getElementById('deviceModal');
    var deviceGameName = document.getElementById('deviceGameName');
    var deviceCancelBtn = document.getElementById('deviceCancelBtn');
    var currentDeviceProject = null;

    function openDeviceModal(projectId, gameName) {
      currentDeviceProject = projectId;
      deviceGameName.textContent = gameName || 'this game';
      deviceModal.classList.add('active');
    }

    function closeDeviceModal() {
      deviceModal.classList.remove('active');
      currentDeviceProject = null;
    }

    function handleDeviceSelection(device) {
      if (!currentDeviceProject) return;
      var files = gameFiles[currentDeviceProject];
      if (!files) { closeDeviceModal(); return; }
      var fileUrl = files[device];
      if (!fileUrl || fileUrl.indexOf('TODO_') !== -1) {
        alert('File not yet uploaded to Google Drive. Please check back later.');
        closeDeviceModal();
        return;
      }

      var link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      closeDeviceModal();
    }

    document.querySelectorAll('.download-project-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var projectId = this.getAttribute('data-project');
        var gameName = this.getAttribute('data-game') || 'this game';
        openDeviceModal(projectId, gameName);
      });
    });

    document.querySelectorAll('.device-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        handleDeviceSelection(this.getAttribute('data-device'));
      });
    });

    deviceCancelBtn.addEventListener('click', closeDeviceModal);
    deviceModal.addEventListener('click', function(e) {
      if (e.target === deviceModal) closeDeviceModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && deviceModal.classList.contains('active')) {
        closeDeviceModal();
      }
    });

    document.querySelectorAll('.project-list-item').forEach(function(item) {
      item.removeAttribute('onclick');
    });
  })();

  // Avvia handleScroll
  setTimeout(handleScroll, 100);

})();
