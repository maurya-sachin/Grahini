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
});

// Selecting DOM elements
let section = document.querySelector(".container"),
  title = document.querySelector(".intro"),
  mark = title.querySelector("strong"),
  dot = document.querySelector(".content-container"),
  header = document.querySelector(".container .header"),
  bgVideo = document.getElementById("bgVideo");

// Setting initial properties with GSAP
gsap.set(dot, {
  width: "140vmax", // ensures it fills every part of the screen. 
  height: "140vmax",
  xPercent: -50, // center the dot in the section area
  yPercent: -50,
  top: "48%",
  left: "48.5%"
});

gsap.set(header, {
  opacity: 0,
  y: -20
});

// GSAP Timeline for animations
let tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: "bottom top",
    // markers: true, // Uncomment for debug markers
    scrub: 1.5,
    pin: section,
    pinSpacing: true,
    invalidateOnRefresh: true,
    onUpdate: checkContentContainerSize // Call the function on every update
  },
  defaults: { ease: "none" }
});

// Animation sequence
tl1
  .to(title, { opacity: 1 })
  .fromTo(dot, {
    scale: 0,
    x: () => {
      let markBounds = mark.getBoundingClientRect(),
        px = markBounds.left + markBounds.width * 0.54; // dot is about 54% from the left of the bounds of the character
      return px - section.getBoundingClientRect().width / 2;
    },
    y: () => {
      let markBounds = mark.getBoundingClientRect(),
        py = markBounds.top + markBounds.height * 0.73; // dot is about 73% from the top of the bounds of the character
      return py - section.getBoundingClientRect().height / 2;
    }
  }, {
    x: 0,
    y: 0,
    ease: "power3.in",
    scale: 1
  })
  .to(header, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "ease-in-out"
  });

// Function to check and update content container size
function checkContentContainerSize() {
  // Get the size of the .content-container
  let contentContainerSize = dot.getBoundingClientRect();

  // Check if the width or height is 100%
  if (contentContainerSize.width >= window.innerWidth && contentContainerSize.height >= window.innerHeight) {
    // Toggle the display property of the background video
    bgVideo.style.display = "none";
    // Show the header with ease and keyframe animation
    gsap.to(header, { opacity: 1, y: 0, duration: 0.5, ease: "ease-in-out" });
  } else {
    // Show the background video
    bgVideo.style.display = "block";
    // Hide the header with ease and keyframe animation
    gsap.to(header, { opacity: 0, y: -20, duration: 0.5, ease: "ease-in-out" });
  }
}
