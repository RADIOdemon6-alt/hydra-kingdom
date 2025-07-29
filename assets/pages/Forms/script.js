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

async function listFilesAndFolders(path) {
  const items = await fetchGitHubContents(path);

  if (items.length === 0) {
    createEmptyFolderButton(path);
    return;
  }

  let hasFiles = false;

  for (const item of items) {
    if (item.type === 'dir') {
      createFolderButton(item);
    } else if (item.type === 'file' && item.name.endsWith('.txt')) {
      hasFiles = true;
      createFileButton(item);
    }
  }

  if (!hasFiles && !items.some(i => i.type === 'dir')) {
    createEmptyFolderButton(path);
  }
}

function createFileButton(file) {
  const box = document.createElement('div');
  box.className = 'form-box';
  box.innerText = file.name;
  box.addEventListener('click', () => openFilePopup(file));
  formsList.appendChild(box);
}

function createFolderButton(folder) {
  const box = document.createElement('div');
  box.className = 'form-box folder';
  box.innerText = '📁 ' + folder.name;
  box.addEventListener('click', async () => {
    formsList.innerHTML = ''; // Clear current view
    await listFilesAndFolders(folder.path);
  });
  formsList.appendChild(box);
}

function createEmptyFolderButton(path) {
  const box = document.createElement('div');
  box.className = 'form-box empty-folder';
  box.innerText = '📁 ' + path.split('/').pop(); // اسم المجلد
  box.addEventListener('click', () => {
    popupTitle.innerText = path.split('/').pop();
    popupContent.innerText = 'خطأ في المسار أو المجلد فارغ!';
    popup.classList.add('show');
  });
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

// بدء التحميل من المجلد الرئيسي
listFilesAndFolders(folderPath);
