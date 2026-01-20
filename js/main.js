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
 * Parallax Effect for Hero Section - 無効化
 */
function initParallaxEffect() {
  // パララックス効果を無効化
  return;

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

/**
 * SAKURA東海国際学園のWordPressから最新記事を自動取得
 */
async function updateNewsFromWordPress() {
  try {
    // RSS to JSON API を使用（CORS回避）
    const rssUrl = 'https://sakura-tokai.jp/feed/';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    console.log('学園のRSSを取得中...');
    
    // RSSを取得
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      console.error('RSS取得エラー:', data.message);
      return;
    }
    
    console.log('記事を取得しました:', data.items.length + '件');
    
    // 最新3件を取得
    const latestArticles = data.items.slice(0, 3);
    
    // news.htmlの表示エリアを取得
    const newsContainer = document.querySelector('.news-list');
    
    if (!newsContainer) {
      console.log('news-listが見つかりません（このページはnews.htmlではない）');
      return;
    }
    
    // HTMLをクリア
    newsContainer.innerHTML = '';
    
    // 記事を表示
    latestArticles.forEach(article => {
      // 日付をフォーマット（YYYY.MM.DD形式）
      const date = new Date(article.pubDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      
      // HTML要素を作成
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item fade-in';
      
      newsItem.innerHTML = `
        <a href="${article.link}" target="_blank" rel="noopener noreferrer">
          <span class="news-date">${formattedDate}</span>
          <h3 class="news-title">${article.title}</h3>
        </a>
      `;
      
      newsContainer.appendChild(newsItem);
    });
    
    console.log('✅ ニュース更新完了:', latestArticles.length + '件表示');
    
  } catch (error) {
    console.error('❌ ニュース取得エラー:', error);
  }
}

/**
 * ホームページ用：最新記事を取得して表示
 */
async function updateHomeNews() {
  try {
    const rssUrl = 'https://sakura-tokai.jp/feed/';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    console.log('ホーム用：学園のRSSを取得中...');
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      console.error('RSS取得エラー:', data.message);
      return;
    }
    
    // 最新3件を取得
    const latestArticles = data.items.slice(0, 3);
    
    // ホームページの表示エリアを取得
    const homeNewsContainer = document.querySelector('.home-news-list');
    
    if (!homeNewsContainer) {
      console.log('home-news-listが見つかりません');
      return;
    }
    
    // HTMLをクリア
    homeNewsContainer.innerHTML = '';
    
    // 記事を表示（ホームページ用のスタイル）
    latestArticles.forEach(article => {
      const date = new Date(article.pubDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      
      const newsCard = document.createElement('a');
      newsCard.href = article.link;
      newsCard.className = 'news-card';
      newsCard.target = '_blank';
      newsCard.rel = 'noopener';
      newsCard.style.cssText = 'display: block; text-decoration: none;';
      
      newsCard.innerHTML = `
        <div class="news-card__meta">
          <span class="news-card__date">${formattedDate}</span>
        </div>
        <div class="news-card__title">${article.title}</div>
      `;
      
      homeNewsContainer.appendChild(newsCard);
    });
    
    console.log('✅ ホームニュース更新完了:', latestArticles.length + '件表示');
    
  } catch (error) {
    console.error('❌ ホームニュース取得エラー:', error);
  }
}

// ページ読み込み時にニュース取得を実行
document.addEventListener('DOMContentLoaded', function() {
  // news.html用
  if (document.querySelector('.news-list')) {
    console.log('news.htmlを検出。学園の最新記事を取得します...');
    updateNewsFromWordPress();
  }
  
  // index.html（ホーム）用
  if (document.querySelector('.home-news-list')) {
    console.log('index.htmlを検出。学園の最新記事を取得します...');
    updateHomeNews();
  }
});