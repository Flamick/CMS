//* Hamburger menu
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');
let toggle = false;
menuBtn.addEventListener('click', () => {
    if(!toggle) {
        menuBtn.classList.add('open');
        mobileMenu.classList.add('open');
        toggle = true;
    } else {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle = false;
    }
});

//* Only if it matches screen size
const mediaDevice = window.matchMedia('(max-width: 1024px)');