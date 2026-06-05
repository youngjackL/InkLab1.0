/* ============================================================
   TIMM INK LAB — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Page Loader ──────────────────────────────────────────
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 600);
    });
    // Fallback: hide after 2s no matter what
    setTimeout(() => loader && loader.classList.add('hidden'), 2000);
  }

  // ── Navbar scroll effect ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ── Active nav link (based on current page) ───────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Mobile hamburger menu ─────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal animations ──────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay based on sibling index
          const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
          let idx = 0;
          siblings.forEach((el, j) => { if (el === entry.target) idx = j; });
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(idx * 80, 400));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ── Smooth scroll for anchor links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Booking form (WhatsApp submission) ────────────────────
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const fname = document.getElementById('fname').value.trim();
      const lname = document.getElementById('lname').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const style = document.getElementById('style').value;
      const placement = document.getElementById('placement').value.trim();
      const budget = document.getElementById('budget').value;
      const message = document.getElementById('message').value.trim();
      
      // Validate required fields
      if (!fname || !lname || !email) {
        alert('Please fill in all required fields (Name and Email)');
        return;
      }
      
      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Opening WhatsApp...';
      btn.disabled = true;
      
      // Format the message for WhatsApp
      const whatsappMessage = `🎨 *New Consultation Request*%0A%0A` +
        `👤 Name: ${fname} ${lname}%0A` +
        `📧 Email: ${email}%0A` +
        `${phone ? `📱 Phone: ${phone}%0A` : ''}` +
        `${style ? `🎯 Tattoo Style: ${style}%0A` : ''}` +
        `${placement ? `📍 Placement: ${placement}%0A` : ''}` +
        `${budget ? `💰 Budget: ${budget}%0A` : ''}` +
        `${message ? `💭 Vision: ${message}` : ''}`;
      
      // WhatsApp number
      const whatsappNumber = '254748384818'; // Replace with your number in international format without '+' or dashes
      
      // Open WhatsApp with pre-filled message
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Update button state
        btn.textContent = '✦ Opening WhatsApp...';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          bookingForm.reset();
        }, 2000);
      }, 1000);
    });
  }

  // ── Gallery lightbox (simple) ─────────────────────────────
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:5000;
        display:flex;align-items:center;justify-content:center;cursor:pointer;
        backdrop-filter:blur(8px);
      `;
      const img = item.querySelector('img');
      if (img) {
        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border:1px solid rgba(201,168,76,0.3);';
        overlay.appendChild(bigImg);
      } else {
        const placeholder = item.querySelector('.gallery-placeholder');
        if (placeholder) {
          const clone = placeholder.cloneNode(true);
          clone.style.cssText = 'width:400px;height:400px;font-size:6rem;';
          overlay.appendChild(clone);
        }
      }
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '✕';
      closeBtn.style.cssText = `
        position:absolute;top:2rem;right:2rem;background:none;border:1px solid rgba(201,168,76,0.4);
        color:var(--gold);font-size:1.2rem;width:42px;height:42px;cursor:pointer;
        font-family:var(--font-heading);transition:all 0.3s;
      `;
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const close = () => {
        overlay.remove();
        document.body.style.overflow = '';
      };
      overlay.addEventListener('click', close);
      closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', handler); }
      });
    });
  });

  // ── Counter animation (stats) ─────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count') || el.textContent);
          const suffix = el.textContent.replace(/[0-9]/g, '').trim();
          let current = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + (suffix || '');
            if (current >= target) clearInterval(interval);
          }, 30);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => {
      const num = parseInt(el.textContent);
      if (!isNaN(num)) {
        el.setAttribute('data-count', num);
        el.textContent = '0' + el.textContent.replace(/[0-9]+/, '');
        countObserver.observe(el);
      }
    });
  }

  // ── Parallax hero logo ────────────────────────────────────
  const heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroLogo.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

});
