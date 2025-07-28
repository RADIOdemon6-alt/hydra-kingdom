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

// حركة فتح و غلق القائمة
compassBtn.addEventListener('click', () => {
  if (!menuOpen) {
    // فتح القائمة
    sideMenu.classList.add('open');
    compassBtn.style.transform = 'rotate(360deg)';
    mainContent.classList.add('hide');
    noteBox.classList.add('hide');
  } else {
    // غلق القائمة
    sideMenu.classList.remove('open');
    compassBtn.style.transform = 'rotate(0deg)';
    mainContent.classList.remove('hide');
    noteBox.classList.remove('hide');
  }
  menuOpen = !menuOpen;
});

// Popup المميزات
featuresBtn.addEventListener('click', () => {
  featuresPopup.style.display = 'flex';
});

// Popup الشروط
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
