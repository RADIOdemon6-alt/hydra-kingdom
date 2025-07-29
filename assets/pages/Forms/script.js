const token = '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';
const repoOwner = 'RADIOdemon6-alt';
const repoName = 'hydra-kingdom';
const branch = 'main';
const folderPath = 'assets/storage';

const formsList = document.getElementById('formsList');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupContent = document.getElementById('popupContent');

async function fetchRepoTree() {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/${branch}?recursive=1`;
  const response = await fetch(url, {
    headers: { Authorization: `token ${token}` }
  });
  if (!response.ok) {
    alert('فشل في تحميل الملفات من GitHub');
    return [];
  }
  const data = await response.json();
  return data.tree || [];
}

function buildFolderStructure(tree) {
  const structure = {};
  tree.forEach(item => {
    if (!item.path.startsWith(folderPath)) return;

    const relativePath = item.path.substring(folderPath.length + 1);
    const parts = relativePath.split('/');
    let current = structure;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        if (item.type === 'blob' && part.endsWith('.txt')) {
          if (!current.files) current.files = [];
          current.files.push({ name: part, path: item.path });
        }
      } else {
        if (!current.folders) current.folders = {};
        if (!current.folders[part]) current.folders[part] = {};
        current = current.folders[part];
      }
    });
  });
  return structure;
}

function renderFolder(folder, folderName = '📂 المجلد الرئيسي') {
  formsList.innerHTML = ''; // Clear current view

  const title = document.createElement('div');
  title.className = 'folder-title';
  title.innerText = folderName;
  formsList.appendChild(title);

  let hasContent = false;

  // Render Folders
  if (folder.folders) {
    for (const subFolder in folder.folders) {
      hasContent = true;
      const folderBtn = document.createElement('div');
      folderBtn.className = 'form-box folder';
      folderBtn.innerText = '📁 ' + subFolder;
      folderBtn.addEventListener('click', () => {
        renderFolder(folder.folders[subFolder], subFolder);
      });
      formsList.appendChild(folderBtn);
    }
  }

  // Render Files
  if (folder.files) {
    folder.files.forEach(file => {
      hasContent = true;
      const fileBtn = document.createElement('div');
      fileBtn.className = 'form-box';
      fileBtn.innerText = file.name;
      fileBtn.addEventListener('click', () => openFilePopup(file.path));
      formsList.appendChild(fileBtn);
    });
  }

  if (!hasContent) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'error-message';
    emptyMsg.innerText = '🚫 هذا المجلد فارغ أو لا يحتوي على ملفات نصية!';
    formsList.appendChild(emptyMsg);
  }
}

async function openFilePopup(filePath) {
  const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${filePath}`;
  const response = await fetch(url);
  const content = await response.text();
  popupTitle.innerText = filePath.split('/').pop();
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

// Main Start
(async () => {
  const tree = await fetchRepoTree();
  const structure = buildFolderStructure(tree);
  renderFolder(structure);
})();
