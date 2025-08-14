(function(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;

  const setIcon = (mode) => { btn.textContent = (mode === 'dark') ? '☀️' : '🌙'; }

  // 初始：讀 localStorage，否則跟系統
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute('data-theme', saved);
    setIcon(saved);
  } else {
    // 跟系統
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIcon(prefersDark ? 'dark' : 'light');
  }

  // 切換
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme'); // 可能為 null
    let next;
    if (!current) {
      // 目前跟隨系統 → 取相反
      next = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    } else {
      next = (current === 'dark') ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIcon(next);
  });

  // 若使用者改了系統主題，且我們「沒有」手動覆蓋，就跟著變
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const savedNow = localStorage.getItem('theme');
    if (!savedNow) {
      const mode = e.matches ? 'dark' : 'light';
      document.documentElement.removeAttribute('data-theme'); // 回到跟隨
      setIcon(mode);
    }
  });
})();
