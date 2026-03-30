// ===== 꽃가루 파티클 애니메이션 =====
window.addEventListener('load', function () {
  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var count = 40;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: randomBetween(0, canvas.width),
      y: canvas.height + randomBetween(5, 20),
      size: randomBetween(2.5, 5.0),
      speedY: randomBetween(-1.4, -0.6),
      speedX: randomBetween(-1.0, -0.2),
      opacity: randomBetween(0.4, 1)
    };
  }

  resize();
  for (var i = 0; i < count; i++) {
    var p = createParticle();
    p.y = randomBetween(0, canvas.height);
    particles.push(p);
  }


  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = '#ffe066';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y < -10 || p.x < -10) {
        Object.assign(p, createParticle());
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  animate();
});

// ===== 카운트다운 (D-day) =====
(function () {
  var weddingDate = new Date('2026-05-01T18:30:00+09:00');

  function updateDday() {
    var now = new Date();
    var diff = weddingDate - now;
    var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    var el = document.getElementById('d-day');
    if (el) {
      el.textContent = days > 0 ? days : 'D-Day';
    }
  }

  updateDday();
})();

// ===== 스크롤 페이드인 =====
(function () {
  var targets = document.querySelectorAll('.fade-in');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) {
    observer.observe(el);
  });

  // 첫 번째 섹션은 페이지 로드 후 자동으로 표시
  var firstFadeIn = document.querySelector('#greeting .fade-in');
  if (firstFadeIn) {
    setTimeout(function () {
      firstFadeIn.classList.add('visible');
      observer.unobserve(firstFadeIn);
    }, 400);
  }
})();

// ===== 계좌 탭 전환 =====
(function () {
  var tabs = document.querySelectorAll('.account-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // 탭 활성화 전환
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      // 콘텐츠 표시 전환
      var targetId = tab.getAttribute('data-target');
      document.querySelectorAll('.account-content').forEach(function (c) {
        c.classList.add('hidden');
      });
      var target = document.getElementById(targetId);
      if (target) {
        target.classList.remove('hidden');
      }
    });
  });
})();

// ===== 계좌번호 복사 =====
(function () {
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          var original = btn.textContent;
          btn.textContent = '복사했습니다';
          setTimeout(function () { btn.textContent = original; }, 1500);
        });
      }
    });
  });
})();

// ===== 갤러리 라이트박스 (스와이프 지원) =====
(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');
  var currentIndex = 0;
  var images = [];
  var touchStartX = 0;

  // 이미지가 있는 갤러리 아이템만 수집
  function buildImageList() {
    images = [];
    document.querySelectorAll('.gallery-item img').forEach(function (img) {
      images.push(img.src);
    });
  }

  function openLightbox(index) {
    buildImageList();
    if (images.length === 0) return;
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }

  // 갤러리 아이템 클릭
  document.querySelectorAll('.gallery-item').forEach(function (item, i) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;
      buildImageList();
      var idx = images.indexOf(img.src);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  // 닫기
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // 라이트박스 열린 동안 배경 스크롤 차단
  lightbox.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, { passive: false });

  // 스와이프
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? showImage(currentIndex + 1) : showImage(currentIndex - 1);
    }
  }, { passive: true });
})();
