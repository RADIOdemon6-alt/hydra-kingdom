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

featuresBtn.addEventListener('click', () => {
  if (!menuOpen) {
    featuresPopup.style.display = 'flex';
  }
});

requirementsBtn.addEventListener('click', () => {
  if (!menuOpen) {
    requirementsPopup.style.display = 'flex';
  }
});

closeFeatures.addEventListener('click', () => {
  featuresPopup.style.display = 'none';
});

closeRequirements.addEventListener('click', () => {
  requirementsPopup.style.display = 'none';
});
