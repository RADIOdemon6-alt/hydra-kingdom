const compassBtn = document.getElementById('compassBtn');
const sideMenu = document.getElementById('sideMenu');
const mainContent = document.getElementById('mainContent');

let menuOpen = false;

compassBtn.addEventListener('click', () => {
  if (!menuOpen) {
    sideMenu.classList.add('open');
    compassBtn.classList.add('close');
    mainContent.classList.add('hide');
  } else {
    sideMenu.classList.remove('open');
    compassBtn.classList.remove('close');
    mainContent.classList.remove('hide');
  }
  menuOpen = !menuOpen;
});

// نسخ الروابط
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.dataset.link;
    navigator.clipboard.writeText(link).then(() => {
      alert('تم نسخ الرابط!');
    });
  });
});

// فتح الروابط
document.querySelectorAll('.go-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.dataset.link;
    window.open(link, '_blank');
  });
});
