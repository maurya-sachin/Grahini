// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Get the preloader and container elements
  var preloader = document.getElementById("preloader");
  var container = document.querySelector(".container");

  // Hide the preloader after 3 seconds or when the page finishes loading
  setTimeout(function () {
    preloader.style.display = "none";
    container.classList.add("show"); // Add the "show" class to the container
    document.body.style.overflow = "overlay"; // Revert overflow to show scrollbar
  }, 3000);
});

// GSAP animation for the intro section
let introHead = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro",

    start: "center bottom",
    end: "+=300",
    scrub: 1,
  }
});

// Animate the intro section using GSAP
introHead.from([".intro"], { y: 200, scale: 1, transformOrigin: "50% 50%", opacity: 0 });
introHead.to([".intro"], { y: -200, scale: 0.5, opacity: 0 });

// GSAP timeline for the main content container section
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".main-content-container",

    start: "top top",
    end: "+=200",
    scrub: 1,
    pin: true // Pin the main content container during the animation
  }
});

// Animate the header and main content within the main content container using GSAP
tl.from([".header", ".main-content"], { y: 300, scale: 0.5, transformOrigin: "50% 50%", opacity: 0, stagger: 0.05 });
