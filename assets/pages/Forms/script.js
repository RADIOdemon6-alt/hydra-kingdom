const token = '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';
const repoOwner = 'RADIOdemon6-alt';
const repoName = 'hydra-kingdom';
const folderPath = 'assets/storage';
const formsList = document.getElementById('formsList');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupContent = document.getElementById('popupContent');

async function fetchGitHubContents(path) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return await response.json();
}

async function listDirectories(path) {
  const items = await fetchGitHubContents(path);

  for (const item of items) {
    if (item.type === 'dir') {
      createFolderButton(item);
    }
  }
}

function createFolderButton(folder) {
  const button = document.createElement('button');
  button.className = 'gold-btn folder-btn';
  button.innerText = `📂 ${folder.name}`;
  button.addEventListener('click', () => listFiles(folder.path));
  formsList.appendChild(button);
}

async function listFiles(path) {
  const items = await fetchGitHubContents(path);

  // Clear previous file buttons (optional if you want)
  let existing = document.querySelector(`.files-container[data-folder="${path}"]`);
  if (existing) {
    existing.remove(); // Toggle off if already exists
    return;
  }

  const container = document.createElement('div');
  container.className = 'files-container';
  container.dataset.folder = path;

  for (const item of items) {
    if (item.type === 'file' && item.name.endsWith('.txt')) {
      const fileButton = document.createElement('button');
      fileButton.className = 'gold-btn file-btn';
      fileButton.innerText = item.name;
      fileButton.addEventListener('click', () => openFilePopup(item));
      container.appendChild(fileButton);
    }
  }

  formsList.appendChild(container);
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

// Start loading directories
listDirectories(folderPath);
