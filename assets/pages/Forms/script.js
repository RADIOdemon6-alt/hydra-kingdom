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

let menuOpen = false;

// فتح/غلق القائمة الجانبية
compassBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  sideMenu.classList.toggle('open');
  compassBtn.classList.toggle('active');
});

// جلب بيانات من GitHub
async function fetchGitHubContents(path) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  const data = await response.json();
  return data;
}

// إنشاء زر مجلد
function createFolderButton(folder) {
  const folderContainer = document.createElement('div');
  folderContainer.className = 'folder-box';

  const folderBtn = document.createElement('button');
  folderBtn.className = 'gold-btn folder-btn';
  folderBtn.innerText = `📂 ${folder.name}`;
  folderBtn.addEventListener('click', () => {
    folderContainer.classList.toggle('expanded');
  });

  const filesContainer = document.createElement('div');
  filesContainer.className = 'files-container';
  filesContainer.dataset.path = folder.path;

  folderContainer.appendChild(folderBtn);
  folderContainer.appendChild(filesContainer);

  formsList.appendChild(folderContainer);

  loadFolderFiles(folder.path, filesContainer);
}

// قراءة الملفات داخل مجلد
async function loadFolderFiles(path, container) {
  const items = await fetchGitHubContents(path);
  for (const item of items) {
    if (item.type === 'file' && item.name.endsWith('.txt')) {
      const fileBtn = document.createElement('button');
      fileBtn.className = 'gold-btn file-btn';
      fileBtn.innerText = item.name;
      fileBtn.addEventListener('click', () => openFilePopup(item));
      container.appendChild(fileBtn);
    }
  }
}

// فتح Popup وعرض محتوى الملف
async function openFilePopup(file) {
  const response = await fetch(file.download_url);
  const content = await response.text();
  popupTitle.innerText = file.name;
  popupContent.innerText = content;
  popup.classList.add('show');
}

// إغلاق Popup
document.getElementById('closePopup').addEventListener('click', () => {
  popup.classList.remove('show');
});

// نسخ المحتوى
document.getElementById('copyContent').addEventListener('click', () => {
  navigator.clipboard.writeText(popupContent.innerText).then(() => {
    alert('تم نسخ المحتوى!');
  });
});

// تحميل المجلدات الرئيسية
async function listFolders(path) {
  const items = await fetchGitHubContents(path);
  for (const item of items) {
    if (item.type === 'dir') {
      createFolderButton(item);
    }
  }
}

// بدء التحميل
listFolders(folderPath);
