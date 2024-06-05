const navIcon = document.querySelector('.nav-icon');
const navMenu = document.querySelector('.nav-menu');

navIcon.addEventListener('click', () => {
  navIcon.classList.toggle('active');
  navMenu.classList.toggle('show');
  navMenu.classList.toggle('hide');
});