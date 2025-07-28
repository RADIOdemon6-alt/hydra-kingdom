const compassBtn = document.getElementById('compassBtn');
const sideMenu = document.getElementById('sideMenu');
const mainContent = document.getElementById('mainContent');

let menuOpen = false;

// فتح/غلق القائمة الجانبية
compassBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  sideMenu.classList.toggle('open');
  compassBtn.classList.toggle('active');

  if (menuOpen) {
    mainContent.classList.add('hide');
    noteBox.classList.add('hide');
  } else {
    mainContent.classList.remove('hide');
    noteBox.classList.remove('hide');
  }
});

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
