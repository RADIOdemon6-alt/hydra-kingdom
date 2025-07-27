const compassBtn = document.getElementById('compassBtn');
const sideMenu = document.getElementById('sideMenu');
const mainContent = document.getElementById('mainContent');
const noteBox = document.getElementById('noteBox');
const featuresBtn = document.getElementById('featuresBtn');
const requirementsBtn = document.getElementById('requirementsBtn');
const featuresPopup = document.getElementById('featuresPopup');
const requirementsPopup = document.getElementById('requirementsPopup');
const closeFeatures = document.getElementById('closeFeatures');
const closeRequirements = document.getElementById('closeRequirements');

let menuOpen = false;

// حركة فتح القائمة مع سقوط العناصر
compassBtn.addEventListener('click', () => {
  if (!menuOpen) {
    // فتح القائمة
    sideMenu.style.right = '0';
    // دوران البوصلة
    compassBtn.style.transform = 'rotate(360deg)';
    // اختفاء الأزرار والملاحظة
    mainContent.classList.add('hide');
    noteBox.classList.add('hide');
  } else {
    // إغلاق القائمة
    sideMenu.style.right = '-300px';
    // إعادة البوصلة لوضعها الطبيعي
    compassBtn.style.transform = 'rotate(0deg)';
    // ظهور الأزرار والملاحظة
    mainContent.classList.remove('hide');
    noteBox.classList.remove('hide');
  }
  menuOpen = !menuOpen;
});

// مميزات الانضمام Popup
featuresBtn.addEventListener('click', () => {
  featuresPopup.style.display = 'flex';
});

// شروط الانضمام Popup
requirementsBtn.addEventListener('click', () => {
  requirementsPopup.style.display = 'flex';
});

// إغلاق Popup المميزات
closeFeatures.addEventListener('click', () => {
  featuresPopup.style.display = 'none';
});

// إغلاق Popup الشروط
closeRequirements.addEventListener('click', () => {
  requirementsPopup.style.display = 'none';
});
