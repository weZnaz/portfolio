/**
 * Enhanced Portfolio Website Scripts
 * Includes: Smooth scrolling, navbar effects, AOS initialization,
 * active link highlight, and mobile menu management
 */

document.addEventListener('DOMContentLoaded', function () {
  // ===== INITIALIZE AOS =====
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar-glass');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // ===== SMOOTH SCROLLING =====
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarHeight = navbar.offsetHeight;

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.navbar-nav .nav-link');

  function highlightNav() {
    let current = '';
    const scrollY = window.pageYOffset + navbarHeight + 50;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 20;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // ===== CLOSE MOBILE MENU ON LINK CLICK =====
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    });
  });

  // ===== CAROUSEL AUTO-PLAY PAUSE ON HOVER =====
  const carousel = document.querySelector('#heroCarousel');
  if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 5000,
      pause: 'hover'
    });
  }

  // ===== TYPING EFFECT FOR HERO TEXT =====
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const phrases = [
      'ICT Student & Aspiring Software Engineer',
      'Full-stack Enthusiast',
      'Problem Solver & Innovator',
      'Building the Future with Code'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        speed = 50;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        speed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        speed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(typeEffect, speed);
    }

    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
  }

  // ===== GALLERY IMAGE ZOOM ON CLICK =====
  const galleryItems = document.querySelectorAll('.gallery-modern');
  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img) {
        // Create modal for image zoom
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: fadeIn 0.3s ease;
        `;
        modal.innerHTML = `
          <img src="${img.src}" alt="${img.alt}" style="
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          ">
          <button style="
            position: absolute;
            top: 20px;
            right: 30px;
            background: none;
            border: none;
            color: #fff;
            font-size: 3rem;
            cursor: pointer;
          ">&times;</button>
        `;
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function () {
          this.remove();
        });
      }
    });
  });

  // ===== FORM SUBMISSION HANDLER =====
  const contactForm = document.querySelector('.contact-form-modern');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Get form values
      const name = this.querySelector('input[placeholder*="name"]');
      const email = this.querySelector('input[type="email"]');
      const subject = this.querySelector('input[placeholder*="Subject"]');
      const message = this.querySelector('textarea');
      
      // Simple validation
      if (name && name.value.trim() === '') {
        showAlert('Please enter your name', 'danger');
        return;
      }
      if (email && email.value.trim() === '') {
        showAlert('Please enter your email', 'danger');
        return;
      }
      if (message && message.value.trim() === '') {
        showAlert('Please enter a message', 'danger');
        return;
      }
      
      // Success message
      showAlert('Thank you! Your message has been sent successfully.', 'success');
      this.reset();
    });
  }

  // ===== ALERT FUNCTION =====
  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.style.cssText = `
      position: fixed;
      top: 90px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      min-width: 300px;
      max-width: 90%;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      animation: slideDown 0.3s ease;
    `;
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 300);
      }
    }, 5000);
  }

  // ===== ADD KEYFRAMES FOR ANIMATIONS =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});