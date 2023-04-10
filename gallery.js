const gallery = document.querySelector('.gallery');
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup-title');
const popupDescription = document.querySelector('.popup-description');
const popupClose = document.querySelector('.popup-close');

// Open popup when clicking on a gallery item
gallery.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.gallery-item');
    if (clickedItem) {
      const title = clickedItem.querySelector('h3').textContent;
      const description = clickedItem.querySelector('p').textContent;
      const imageUrl = clickedItem.querySelector('img').src;
      popupTitle.textContent = title;
      popupDescription.textContent = description;
      const popupImage = popup.querySelector('.popup-image');
      popupImage.src = imageUrl;
      popup.style.display = 'block';
  
      // Close popup when clicking on the image
      popupImage.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    }
  });

// Close popup when clicking on the close button or outside the popup
popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});

popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});