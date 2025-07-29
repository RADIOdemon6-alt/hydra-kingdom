const token = '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';
const repoOwner = 'RADIOdemon6-alt';
const repoName = 'hydra-kingdom';
const folderPath = 'assets/storage';

const formsList = document.getElementById('formsList');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupContent = document.getElementById('popupContent');
const compassBtn = document.getElementById('compassBtn');
const sideMenu = document.getElementById('sideMenu');

const mainContent = document.getElementById('mainContent') || document.createElement('div');
const noteBox = document.getElementById('noteBox') || document.createElement('div');

let menuOpen = false;
let foundFiles = 0; // عداد لعدد الملفات التي تم العثور عليها

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

async function fetchGitHubContents(path) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  if (!response.ok) {
    return [];
  }
  return await response.json();
}

async function listFilesRecursively(path) {
  const items = await fetchGitHubContents(path);
  if (items.length === 0) {
    return; // مجلد فارغ
  }

  for (const item of items) {
    if (item.type === 'dir') {
      await listFilesRecursively(item.path);
    } else if (item.type === 'file' && item.name.endsWith('.txt')) {
      foundFiles++;
      createFileButton(item);
    }
  }
}

function createFileButton(file) {
  const box = document.createElement('div');
  box.className = 'form-box';
  box.innerText = file.name;
  box.addEventListener('click', () => openFilePopup(file));
  formsList.appendChild(box);
}

async function openFilePopup(file) {
  const response = await fetch(file.download_url);
  const content = await response.text();
  popupTitle.innerText = file.name;
  popupContent.innerText = content;
  popup.classList.add('show');
}

document.getElementById('closePopup').addEventListener('click', () => {
  popup.classList.remove('show');
});

document.getElementById('copyContent').addEventListener('click', () => {
  navigator.clipboard.writeText(popupContent.innerText).then(() => {
    alert('تم نسخ المحتوى!');
  });
});

// بدء التحميل
(async () => {
  await listFilesRecursively(folderPath);

  // بعد انتهاء البحث بالكامل
  if (foundFiles === 0) {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerText = 'خطأ في المسار أو المجلد فارغ!';
    formsList.appendChild(message);
  }
})();
