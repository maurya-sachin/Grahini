// PRELOADER

const preloader = document.querySelector('.preloader');

const fadeEffect = () => {
    if (!preloader.style.opacity) {
        preloader.style.opacity = 1;
    }
    if (preloader.style.opacity > 0) {
        preloader.style.opacity -= 0.1;
    } else {
        clearInterval(fadeInterval);
        preloader.style.display = 'none'; // Hide the preloader instead of removing it
    }
};

const fadeInterval = setInterval(fadeEffect, 300);

window.addEventListener('load', fadeEffect);
