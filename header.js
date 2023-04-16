const header = document.querySelector('header');
const navSocials = document.querySelector('.nav-socials');

function toggleHeaderAndNavSocials() {
  if (window.innerWidth < 768) {
    header.style.display = 'none';
    navSocials.style.display = 'none';
  } else {
    header.style.display = 'block';
    navSocials.style.display = 'flex';
  }
}

// Call the function when the page loads and whenever the screen is resized
toggleHeaderAndNavSocials();
window.addEventListener('resize', toggleHeaderAndNavSocials);
