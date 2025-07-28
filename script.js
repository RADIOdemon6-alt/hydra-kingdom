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
let animating = false;

compassBtn.addEventListener('click', () => {
  if (animating) return;
  animating = true;

  if (!menuOpen) {
    // فتح القائمة
    sideMenu.classList.add('open');
    mainContent.classList.add('hide');
    noteBox.classList.add('hide');
    compassBtn.classList.add('close');
  } else {
    // غلق القائمة
    sideMenu.classList.remove('open');
    mainContent.classList.remove('hide');
    noteBox.classList.remove('hide');
    compassBtn.classList.remove('close');
  }

  menuOpen = !menuOpen;

  setTimeout(() => {
    animating = false;
  }, 500); // وقت الانميشن
});

// Popup مميزات الانضمام
featuresBtn.addEventListener('click', () => {
  featuresPopup.style.display = 'flex';
});

// Popup شروط الانضمام
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
