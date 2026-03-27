// ===== 카운트다운 (D-day) =====
(function () {
  var weddingDate = new Date('2026-11-22T14:00:00+09:00');

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
