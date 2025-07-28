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
    // تعطيل الأزرار
    featuresBtn.classList.add('disabled');
    requirementsBtn.classList.add('disabled');
  } else {
    // غلق القائمة
    sideMenu.classList.remove('open');
    compassBtn.style.transform = 'rotate(0deg)';
    mainContent.classList.remove('hide');
    noteBox.classList.remove('hide');
    // تفعيل الأزرار
    featuresBtn.classList.remove('disabled');
    requirementsBtn.classList.remove('disabled');
  }
  menuOpen = !menuOpen;
});

// منع الضغط على الأزرار لما القائمة مفتوحة
featuresBtn.addEventListener('click', (e) => {
  if (featuresBtn.classList.contains('disabled')) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }
  featuresPopup.style.display = 'flex';
});

requirementsBtn.addEventListener('click', (e) => {
  if (requirementsBtn.classList.contains('disabled')) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }
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
