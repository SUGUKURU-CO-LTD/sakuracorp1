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
 * index.htmlの統計バーと事業カードは除外
 */
function initFadeInAnimation() {
  // アニメーションを完全に無効化
  return;
  
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length === 0) return;
  
  // index.htmlとschool.htmlの統計バーと事業カード内の要素は除外
  const isIndexPage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' || 
                      window.location.pathname.endsWith('/index.html');
  
  const isSchoolPage = window.location.pathname.includes('school.html');
  
  // Add staggered delay based on position
  fadeElements.forEach((element, index) => {
    // index.htmlとschool.htmlの統計バーと事業カード内の要素はアニメーション無効化
    if ((isIndexPage || isSchoolPage) && (
      element.closest('.stats-bar') || 
      element.closest('.business-preview') ||
      element.closest('.section__header')
    )) {
      element.classList.add('visible');
      element.style.transitionDelay = '0s';
      return;
    }
    element.style.transitionDelay = `${index * 0.1}s`;
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // index.htmlとschool.htmlの統計バーと事業カードは即座に表示
        if ((isIndexPage || isSchoolPage) && (
          entry.target.closest('.stats-bar') || 
          entry.target.closest('.business-preview') ||
          entry.target.closest('.section__header')
        )) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.add('visible');
        }
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
 * トップページのみ4秒間表示
 */
function initSakuraAnimation() {
  // トップページ以外では桜吹雪を表示しない
  const currentPage = window.location.pathname;
  const isTopPage = currentPage === '/' || currentPage === '/index.html' || currentPage.endsWith('/index.html');
  
  if (!isTopPage) {
    return; // トップページ以外は何もしない
  }
  
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
  
  // 4秒後に桜吹雪を削除
  setTimeout(() => {
    if (container && container.parentNode) {
      container.style.opacity = '0';
      container.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        container.remove();
      }, 500);
    }
  }, 4000);
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
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element, target, unit) {
  let current = 0;
  const increment = target / 50; // 50 steps
  const duration = 1500; // 1.5 seconds
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.innerHTML = `${target}<span>${unit}</span>`;
      clearInterval(timer);
    } else {
      element.innerHTML = `${Math.floor(current)}<span>${unit}</span>`;
    }
  }, stepTime);
}

/**
 * Form Validation
 */
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    if (!name.value.trim()) {
      showError(name, 'お名前を入力してください');
      isValid = false;
    }
    
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError(email, '有効なメールアドレスを入力してください');
      isValid = false;
    }
    
    if (!message.value.trim()) {
      showError(message, 'お問い合わせ内容を入力してください');
      isValid = false;
    }
    
    if (isValid) {
      // In a real application, you would send the form data here
      alert('お問い合わせありがとうございます。\n担当者より折り返しご連絡いたします。');
      form.reset();
    }
  });
}

function showError(input, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = 'var(--color-primary-dark)';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
  input.style.borderColor = 'var(--color-primary-dark)';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Parallax Effect for Hero Section
 */
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
}

/**
 * Hero Slideshow
 */
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  // Start slideshow
  setInterval(nextSlide, slideInterval);
})();