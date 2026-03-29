// ===== 꽃가루 파티클 애니메이션 (레이어 깊이감) =====
window.addEventListener('load', function () {
  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // 레이어별 설정: 0=뒤(선명/느림), 1=중간, 2=앞(블러/빠름)
  var layerConfig = [
    { count: 12, sizeMin: 0.8, sizeMax: 2.0, speedMin: 0.1, speedMax: 0.25, opacityMin: 0.3,  opacityMax: 0.6,  blur: 0, glow: false },
    { count: 4,  sizeMin: 2.5, sizeMax: 4.5, speedMin: 0.3, speedMax: 0.5,  opacityMin: 0.45, opacityMax: 0.8,  blur: 3, glow: true  },
    { count: 3,  sizeMin: 5.0, sizeMax: 9.0, speedMin: 0.6, speedMax: 1.0,  opacityMin: 0.5,  opacityMax: 0.85, blur: 9, glow: true  }
  ];

  function createParticle(cfg) {
    var angle = randomBetween(0, Math.PI * 2);
    var speed = randomBetween(cfg.speedMin, cfg.speedMax);
    return {
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      size: randomBetween(cfg.sizeMin, cfg.sizeMax),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      opacity: randomBetween(cfg.opacityMin, cfg.opacityMax),
      fadeDir: Math.random() > 0.5 ? 1 : -1,
      fadeSpeed: randomBetween(0.003, 0.007),
      opacityMin: cfg.opacityMin,
      opacityMax: cfg.opacityMax,
      glow: cfg.glow,
      blur: cfg.blur,
      wobble: randomBetween(0, Math.PI * 2),
      wobbleSpeed: randomBetween(0.005, 0.018),
      wobbleAmp: randomBetween(0.1, 0.4),
      cfg: cfg
    };
  }

  resize();
  var particles = [];
  layerConfig.forEach(function (cfg) {
    for (var i = 0; i < cfg.count; i++) {
      particles.push(createParticle(cfg));
    }
  });
  // 레이어 순으로 정렬 (뒤→앞 순서로 그리기)
  particles.sort(function (a, b) { return a.blur - b.blur; });

  function drawParticle(p) {
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = '#ffe066';
    if (p.glow) {
      ctx.shadowBlur = p.size * 3.5;
      ctx.shadowColor = '#ffd700';
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  var currentBlur = -1;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentBlur = -1;

    particles.forEach(function (p) {
      // 블러 변경은 레이어가 바뀔 때만 (성능 최적화)
      if (p.blur !== currentBlur) {
        ctx.filter = p.blur > 0 ? 'blur(' + p.blur + 'px)' : 'none';
        currentBlur = p.blur;
      }

      drawParticle(p);

      // 페이드 인/아웃
      p.opacity += p.fadeDir * p.fadeSpeed;
      if (p.opacity >= p.opacityMax) p.fadeDir = -1;
      if (p.opacity <= p.opacityMin) p.fadeDir = 1;

      // 이동
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
      p.y += p.vy + Math.cos(p.wobble) * p.wobbleAmp;

      // 화면 밖 → 반대편 재등장
      if (p.x < -15) p.x = canvas.width + 15;
      if (p.x > canvas.width + 15) p.x = -15;
      if (p.y < -15) p.y = canvas.height + 15;
      if (p.y > canvas.height + 15) p.y = -15;
    });

    ctx.filter = 'none';
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
