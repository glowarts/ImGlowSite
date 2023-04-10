const gallery = document.querySelector('.gallery');
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup-title');
const popupDescription = document.querySelector('.popup-description');
const popupClose = document.querySelector('.popup-close');

// Open popup when clicking on a gallery item
gallery.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      const title = event.target.nextElementSibling.querySelector('h3').textContent;
      const description = event.target.nextElementSibling.querySelector('p').textContent;
      const imageUrl = event.target.src;
      popupTitle.textContent = title;
      popupDescription.textContent = description;
      const popupImage = popup.querySelector('.popup-image');
      popupImage.src = imageUrl;
      popup.style.display = 'block';
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

