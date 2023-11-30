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


// SCROLL TRIGGer

const viewportHeader = document.querySelector('.intro');

// Function to handle the scroll event
const handleScroll = () => {
    const scaleFactor = 1 - window.scrollY / window.innerHeight;

    viewportHeader.style.transform = `scale(${scaleFactor})`;
    viewportHeader.style.opacity = scaleFactor;

    if (scaleFactor <= 0) {
        viewportHeader.style.display = 'none';
    } else {
        viewportHeader.style.display = 'flex';
    }
};

window.addEventListener('scroll', handleScroll);
handleScroll();
