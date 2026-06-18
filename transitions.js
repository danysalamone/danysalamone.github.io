/* transitions.js — Daniel Salamone Portfolio */

(function () {

  /* ── 1. PAGE-IN: elements animate in on load ── */
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(el => {
    const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    // Small base offset so browser has painted before we start
    setTimeout(() => {
      el.classList.add('visible');
    }, 80 + delay);
  });

  /* ── 2. SCROLL REVEAL: for elements below the fold ── */
  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Only observe elements not yet visible
    reveals.forEach(el => {
      if (!el.classList.contains('visible')) {
        scrollObserver.observe(el);
      }
    });
  }

  /* ── 3. PAGE-OUT: fade out before navigating ── */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('http') &&
      !href.startsWith('//') &&
      !href.startsWith('#') &&
      !href.startsWith('mailto') &&
      !href.startsWith('tel') &&
      !href.startsWith('whatsapp')
    ) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(-8px)';
        setTimeout(() => {
          window.location.href = href;
        }, 260);
      });
    }
  });

})();
