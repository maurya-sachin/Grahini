// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Get the preloader and container elements
  let preloader = document.getElementById("preloader");
  let container = document.querySelector(".container");
  let intro = document.querySelector(".intro");

  // Hide the preloader after 3 seconds or when the page finishes loading
  setTimeout(function () {
    preloader.style.display = "none";
    container.classList.add("show"); // Add the "show" class to the container
    document.body.style.overflow = "overlay"; // Revert overflow to show scrollbar

    // Add a class to trigger the scale and opacity animation on the intro section
    intro.classList.add("animate-intro");
  }, 3000);






  // Get the header element
  let header = document.querySelector('.header');

  // Get the content-container element
  let contentContainer = document.querySelector('.content-container');

  const menuButton = document.querySelector('.menu');
  const sidebar = document.querySelector('.sidebar');

  let isHeaderVisible = false;

  // Add a scroll event listener to the window
  window.addEventListener('scroll', function () {
    // Get the current scroll position
    let scrollPosition = window.scrollY || window.pageYOffset;

    // Get the offset of the content-container from the top of the document
    let contentContainerOffset = contentContainer.offsetTop;

    // Check if the scroll position is greater than or equal to the content-container offset
    if (scrollPosition >= contentContainerOffset) {
      // If true, add the 'visible' class to the header
      header.classList.add('visible');
      isHeaderVisible = true;

      // Animate the header with GSAP
      gsap.to(header, {
        duration: 0.5,
        y: 0,
        scale: 1,
        ease: "power2.out"
      });
    } else {
      // If false, remove the 'visible' class from the header
      header.classList.remove('visible');
      isHeaderVisible = false;

      // Animate the header to hide with GSAP
      gsap.to(header, {
        duration: 0.5,
        y: -20,
        scale: 0.8,
        ease: "power2.out"
      });
    }
  });



  // Function to toggle the sidebar
  function toggleSidebar() {
    if (isHeaderVisible) {
      const content = document.querySelector('.content-container');
      menuButton.classList.toggle('active');

      // Toggle sidebar width between 300px and 0px
      const newWidth = sidebar.offsetWidth === 0 ? 300 : 0;

      gsap.to(sidebar, { width: newWidth, ease: 'power2.out' });
      gsap.to(content, { marginLeft: newWidth, ease: 'power2.out' });
    }
  }

  // Add a click event listener to the menu button
  menuButton.addEventListener('click', toggleSidebar);


  let footer = document.querySelector('footer');
  let isContentVisible = false;

  window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY || window.pageYOffset;
    let contentContainerOffset = contentContainer.offsetTop;
    let footerOffset = footer.offsetTop;

    // Check if the scroll position is greater than or equal to the content-container offset
    if (scrollPosition >= contentContainerOffset) {
      isContentVisible = true;
    } else {
      isContentVisible = false;
    }

    // Adjust the sidebar opacity based on content visibility
    gsap.to(sidebar, {
      duration: 0.5,
      opacity: isContentVisible ? 1 : 0,
      ease: "power2.out"
    });


    // Check if the sidebar enters the footer section
    if (scrollPosition + sidebar.offsetHeight >= footerOffset) {
      // Change the color of the a tags inside the sidebar
      gsap.to('.sidebar a', {
        color: '#000000',
        borderColor: '#000',
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      // Reset the color if not in the footer section
      gsap.to('.sidebar a', {
        color: '#fff',
        borderColor: '#fff',
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  });


});


// Section horizontal scroll

const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function (sec, i) {

  var thisPinWrap = sec.querySelector('.pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

  gsap.fromTo(thisAnimWrap, {
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
  }, {
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
    ease: "none",
    scrollTrigger: {
      trigger: sec,
      start: "top top+=100",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      //anticipatePin: 1,
      scrub: true,
      //markers: true,
    }
  });

});


// GO TO TOP
function goToTop() {
  // Scroll to the top of the page with a smooth animation
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}