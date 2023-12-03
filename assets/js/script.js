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
