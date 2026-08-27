/* 墨香情官网 交互脚本 */
(function () {
  'use strict';

  /* ---------- 1. 导航滚动状态 ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 滚动渐显 ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 3. 数字滚动动画 ---------- */
  function formatNum(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function animateNumber(el, target, duration) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
      el.textContent = formatNum(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatNum(target);
    }
    requestAnimationFrame(step);
  }
  var heroCount = document.getElementById('heroCount');
  if (heroCount) animateNumber(heroCount, 8862715, 2200);

  var reserveCount = document.getElementById('reserveCount');
  if (reserveCount && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateNumber(reserveCount, 921608, 1800);
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    io2.observe(reserveCount);
  } else if (reserveCount) {
    reserveCount.textContent = '921,608';
  }

  /* ---------- 4. 公告轮播 ---------- */
  var notices = document.querySelectorAll('#noticeList .notice-item');
  if (notices.length > 1) {
    var idx = 0;
    setInterval(function () {
      notices[idx].classList.remove('active');
      idx = (idx + 1) % notices.length;
      notices[idx].classList.add('active');
    }, 4000);
  }
})();
