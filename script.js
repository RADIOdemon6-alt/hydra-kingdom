const compassBtn = document.getElementById('compassBtn');
const sideMenu = document.getElementById('sideMenu');
const featuresBtn = document.getElementById('featuresBtn');
const requirementsBtn = document.getElementById('requirementsBtn');
const featuresPopup = document.getElementById('featuresPopup');
const requirementsPopup = document.getElementById('requirementsPopup');
const closeFeatures = document.getElementById('closeFeatures');
const closeRequirements = document.getElementById('closeRequirements');

let menuOpen = false;

compassBtn.addEventListener('click', () => {
  compassBtn.style.transform = menuOpen ? 'rotate(0deg)' : 'rotate(360deg)';
  sideMenu.style.left = menuOpen ? '-300px' : '0';
  menuOpen = !menuOpen;
});

featuresBtn.addEventListener('click', () => {
  featuresPopup.style.display = 'flex';
});

requirementsBtn.addEventListener('click', () => {
  requirementsPopup.style.display = 'flex';
});

closeFeatures.addEventListener('click', () => {
  featuresPopup.style.display = 'none';
});

closeRequirements.addEventListener('click', () => {
  requirementsPopup.style.display = 'none';
});
