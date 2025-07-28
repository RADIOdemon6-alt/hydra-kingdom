const compassBtn = document.getElementById('compassBtn');
const sideMenu = document.getElementById('sideMenu');
const mainContent = document.getElementById('mainContent');
const featuresPopup = document.getElementById('featuresPopup');
const requirementsPopup = document.getElementById('requirementsPopup');
const featuresBtn = document.getElementById('featuresBtn');
const requirementsBtn = document.getElementById('requirementsBtn');
const closeFeatures = document.getElementById('closeFeatures');
const closeRequirements = document.getElementById('closeRequirements');

// فتح/غلق القائمة بتحويل البوصلة X والعكس
compassBtn.addEventListener('click', () => {
  compassBtn.classList.toggle('close');
  sideMenu.classList.toggle('open');
  mainContent.classList.toggle('hide');
});

// فتح Popup المميزات
featuresBtn.addEventListener('click', () => {
  featuresPopup.style.display = 'flex';
});

// فتح Popup الشروط
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
