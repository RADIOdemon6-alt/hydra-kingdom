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

// لو عندك عناصر mainContent و noteBox عرّفهم هنا  
const mainContent = document.getElementById('mainContent') || document.createElement('div');  
const noteBox = document.getElementById('noteBox') || document.createElement('div');  

let menuOpen = false;  

// فتح/غلق القائمة الجانبية  
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
    console.error('Failed to fetch:', response.status);  
    return [];  
  }  
  return await response.json();  
}  

async function listFiles(path) {  
  const items = await fetchGitHubContents(path);  
  for (const item of items) {  
    if (item.type === 'dir') {  
      await listFiles(item.path); // مجلد فرعي  
    } else if (item.type === 'file' && item.name.endsWith('.txt')) {  
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
listFiles(folderPath);
