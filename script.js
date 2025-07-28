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

// فتح/إغلاق القائمة مع دوران البوصلة وتحوّلها X
compassBtn.addEventListener('click', () => {
  if (animating) return; // منع السبام
  animating = true;

  compassBtn.classList.add('animating');

  setTimeout(() => {
    compassBtn.classList.remove('animating');
    compassBtn.classList.toggle('close');

    if (!menuOpen) {
      // فتح القائمة
      sideMenu.classList.add('open');
      mainContent.classList.add('hide');
      noteBox.classList.add('hide');
    } else {
      // غلق القائمة
      sideMenu.classList.remove('open');
      mainContent.classList.remove('hide');
      noteBox.classList.remove('hide');
    }

    menuOpen = !menuOpen;
    animating = false;
  }, 500); // زمن الانميشن
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
