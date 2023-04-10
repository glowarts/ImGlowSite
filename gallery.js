const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const galleryContainer = document.querySelector('.gallery-container');
const popup = document.querySelector('.popup');
const popupImg = popup.querySelector('img');
const popupTitle = popup.querySelector('h2');
const popupDesc = popup.querySelector('p');
const closeBtn = popup.querySelector('.close-btn');
const imageFolder = 'gallery/';

function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

async function loadImages() {
    const imagePaths = await fetch(imageFolder).then((res) => res.text());
    const imagePathsArray = imagePaths
      .match(/href="([^"]+\.(jpg|jpeg|png|gif))"/gi)
      .map((match) => match.slice(6, -1));
    const images = await Promise.all(imagePathsArray.map((path) => loadImage(path)));
    let imagesInRow = 5; // Number of images to display in a row
    if (window.innerWidth < 768) {
      imagesInRow = 3; // Change the number of images for mobile devices
    }
    let row = document.createElement('div');
    row.classList.add('row');
    galleryContainer.appendChild(row);
    images.forEach(async (image, index) => {
      const filename = imagePathsArray[index].split('/').pop();
      const title = filename.split('.')[0].split('!').slice(-1)[0].replace(/_/g, ' ');
      const description = await fetch(
        imagePathsArray[index].replace(/\.(jpg|jpeg|png|gif)$/i, '.txt')
      )
        .then((res) => {
          if (res.ok) {
            return res.text();
          } else {
            return '';
          }
        })
        .catch(() => {
          return '';
        });
      createImage(image, title, description, row);
      if ((index + 1) % imagesInRow === 0) { // Create new row after every imagesInRow images
        row = document.createElement('div');
        row.classList.add('row');
        galleryContainer.appendChild(row);
      }
    });
  }
  
  function createImage(image, title, description, row) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image');
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    imageContainer.appendChild(img);
    const titleEl = document.createElement('h2');
    titleEl.innerText = title;
    const desc = document.createElement('p');
    desc.innerText = description;
    row.appendChild(imageContainer);
  
    // Add click event listener to the image
    img.addEventListener('click', () => openPopup(image, titleEl, desc));
  }

function openPopup(image, title, desc) {
  // Create the overlay element
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  // Display the clicked image in the popup
  popupImg.src = image.src;
  popupTitle.innerText = title.innerText;
  popupDesc.innerText = desc.innerText;

  // Show the overlay and popup
  overlay.classList.add('show');
  popup.classList.add('show');

  // Apply blur filter to background
  document.querySelector('.gallery-container').style.filter = 'blur(4px)';

  // Add click event listener to the close button
  closeBtn.addEventListener('click', closePopup);

  // Add click event listener to the overlay to close the popup
  overlay.addEventListener('click', closePopup);
}

function closePopup() {
  // Hide the popup
  popup.classList.remove('show');

  // Remove blur filter from background
  document.querySelector('.gallery-container').style.filter = 'none';

  // Remove the overlay element from the DOM
  document.body.removeChild(document.querySelector('.overlay'));
}