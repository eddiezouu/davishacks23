const imageInput = document.getElementById('image-input');
const imageList = document.getElementById('image-list');

imageInput.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
  const files = event.target.files;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const imageUrl = event.target.result;
        addImageToList(imageUrl);
      }
      
      reader.readAsDataURL(file);
    }
  }
  
  // Clear the file input
  imageInput.value = '';
}

function addImageToList(imageUrl) {
  const listItem = document.createElement('li');
  listItem.className = 'image-item';
  
  const image = document.createElement('img');
  image.src = imageUrl;
  image.addEventListener('load', resizeImage);
  
  listItem.appendChild(image);
  imageList.appendChild(listItem);
}

function resizeImage(event) {
  const image = event.target;
  const container = image.parentElement;
  
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;
  
  if (imageWidth > imageHeight) {
    image.style.width = '100%';
    image.style.height = 'auto';
  } else {
    image.style.width = 'auto';
    image.style.height = '100%';
  }
  
  const resizedWidth = image.offsetWidth;
  const resizedHeight = image.offsetHeight;
  
  if (resizedWidth > containerWidth || resizedHeight > containerHeight) {
    image.style.width = '';
    image.style.height = '';
  }
}
