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

compassBtn.addEventListener('click', () => {
  if (!menuOpen) {
    // فتح القائمة
    sideMenu.classList.add('open');
    compassBtn.classList.add('close'); // تحويل لعلامة X
    mainContent.style.display = 'none';
    noteBox.style.display = 'none';
  } else {
    // قفل القائمة
    sideMenu.classList.remove('open');
    compassBtn.classList.remove('close'); // رجوع لبوصلة
    mainContent.style.display = 'flex';
    noteBox.style.display = 'flex';
  }
  menuOpen = !menuOpen;
});

// فتح Popup المميزات
featuresBtn.addEventListener('click', () => {
  if (!menuOpen) {
    featuresPopup.style.display = 'flex';
  }
});

// فتح Popup الشروط
requirementsBtn.addEventListener('click', () => {
  if (!menuOpen) {
    requirementsPopup.style.display = 'flex';
  }
});

// إغلاق Popup المميزات
closeFeatures.addEventListener('click', () => {
  featuresPopup.style.display = 'none';
});

// إغلاق Popup الشروط
closeRequirements.addEventListener('click', () => {
  requirementsPopup.style.display = 'none';
});
