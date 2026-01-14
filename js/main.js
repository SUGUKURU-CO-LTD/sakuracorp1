/**
 * 株式会社SAKURA東海コーポレーション
 * コーポレートサイト JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  initMobileNav();
  
  // Smooth Scroll
  initSmoothScroll();
  
  // Fade In Animation
  initFadeInAnimation();
  
  // Form Validation
  initFormValidation();
  
  // Header Scroll Effect
  initHeaderScroll();
  
  // Sakura Petal Animation
  initSakuraAnimation();
  
  // Counter Animation for Stats
  initCounterAnimation();
  
  // Parallax Effect
  initParallaxEffect();
});

/**
 * Mobile Navigation
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  
  if (!navToggle || !navList) return;
  
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking on a link
  const navLinks = navList.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navList.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';

    });
  });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Enhanced Fade In Animation on Scroll with stagger effect
 */
function initFadeInAnimation() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length === 0) return;
  
  // Add staggered delay based on position
  fadeElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Sakura Petal Falling Animation - Enhanced Beautiful Version
 */
function initSakuraAnimation() {
  // Check if sakura container already exists
  if (document.querySelector('.sakura-container')) return;
  
  const container = document.createElement('div');
  container.className = 'sakura-container';
  document.body.appendChild(container);
  
  // Create beautiful petals - more petals for richer effect
  const petalCount = 40;
  
  for (let i = 0; i < petalCount; i++) {
    createBeautifulPetal(container, i);
  }
}

function createBeautifulPetal(container, index) {
  const petal = document.createElement('div');
  petal.className = 'sakura-petal';
  
  // Random shape class (1-5 different shapes)
  const shapeNum = Math.floor(Math.random() * 5) + 1;
  petal.classList.add(`shape-${shapeNum}`);
  
  // Random size class
  const sizeOptions = ['size-small', 'size-medium', 'size-large'];
  const sizeClass = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
  petal.classList.add(sizeClass);
  
  // Random gradient variant
  const variantNum = Math.floor(Math.random() * 6) + 1;
  petal.classList.add(`variant-${variantNum}`);
  
  // Random position
  const left = Math.random() * 100;
  petal.style.left = `${left}%`;
  
  // Random animation duration (10-20 seconds for slow, elegant fall)
  const duration = Math.random() * 10 + 12;
  petal.style.animationDuration = `${duration}s`;
  
  // Random delay
  const delay = Math.random() * 15;
  petal.style.animationDelay = `-${delay}s`;
  
  // Random initial rotation
  const initialRotation = Math.random() * 360;
  petal.style.transform = `rotate(${initialRotation}deg)`;
  
  // Some petals will have glow effect
  if (index % 7 === 0) {
    petal.classList.add('glow');
  }
  
  container.appendChild(petal);
  
  // Recreate petal with new random properties after each animation
  petal.addEventListener('animationiteration', () => {
    // New random horizontal position
    const newLeft = Math.random() * 100;
    petal.style.left = `${newLeft}%`;
    
    // New random size
    const sizeOptions = ['size-small', 'size-medium', 'size-large'];
    petal.classList.remove('size-small', 'size-medium', 'size-large');
    const newSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
    petal.classList.add(newSize);
    
    // New random variant
    const oldVariant = petal.className.match(/variant-\d/);
    if (oldVariant) petal.classList.remove(oldVariant[0]);
    const newVariant = Math.floor(Math.random() * 6) + 1;
    petal.classList.add(`variant-${newVariant}`);
    
    // Reset delay
    petal.style.animationDelay = '0s';
  });
}

/**
 * Counter Animation for Stats Numbers
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stats-bar__number');
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const text = counter.textContent;
        
        // Extract number and unit
        const match = text.match(/(\d+)(.*)/);
        if (match) {
          const target = parseInt(match[1]);
          const unit = match[2];
          animateCounter(counter, target, unit);
        }
        
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, unit) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    const current = Math.floor(start + (target - start) * easeOutQuart);
    element.innerHTML = `${current}${unit}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.innerHTML = `${target}${unit}`;
    }
  }
  
  requestAnimationFrame(update);
}

/**
 * Parallax Effect for Hero Section
 */
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  const heroBefore = hero ? hero.querySelector('::before') : null;
  
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
      const elements = hero.querySelectorAll('::before, ::after');
      elements.forEach(el => {
        if (el.style) {
          const speed = 0.5;
          const yPos = -(scrolled * speed);
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    }
  });
}

/**
 * Form Validation
 */
function initFormValidation() {
  const form = document.querySelector('.form');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Reset previous errors
    form.querySelectorAll('.form__error').forEach(error => error.remove());
    form.querySelectorAll('.form__input--error').forEach(input => {
      input.classList.remove('form__input--error');
    });
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        showFieldError(field, 'この項目は必須です');
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        isValid = false;
        showFieldError(field, '正しいメールアドレスを入力してください');
      }
    });
    
    if (isValid) {
      // Show success message (in real implementation, submit to server)
      showFormSuccess(form);
    }
  });
}

/**
 * Show field error
 */
function showFieldError(field, message) {
  field.classList.add('form__input--error');
  const error = document.createElement('p');
  error.className = 'form__error';
  error.textContent = message;
  error.style.color = '#C2185B';
  error.style.fontSize = '0.85rem';
  error.style.marginTop = '0.25rem';
  field.parentNode.appendChild(error);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Show form success message
 */
function showFormSuccess(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'form__success';
  successMessage.innerHTML = `
    <div style="text-align: center; padding: 2rem; background-color: #FCE4EC; border-radius: 16px;">
      <p style="font-size: 1.5rem; color: #333; margin-bottom: 0.5rem;">送信完了</p>
      <p style="color: #666; line-height: 1.8;">お問い合わせありがとうございます。<br>担当者より折り返しご連絡いたします。</p>
    </div>
  `;
  
  form.innerHTML = '';
  form.appendChild(successMessage);
}

/**
 * Set current page active in navigation
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Run on page load
setActiveNavLink();

/**
 * Button hover ripple effect
 */
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      width: 100px;
      height: 100px;
      left: ${x - 50}px;
      top: ${y - 50}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation to document
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

/**
 * Card hover 3D tilt effect
 */
document.querySelectorAll('.card, .business-preview__card, .service-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});
