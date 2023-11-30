document.addEventListener("DOMContentLoaded", function () {
    var preloader = document.getElementById("preloader");
    var container = document.querySelector(".container");

    // Hide the preloader after 3 seconds or when the page finishes loading
    setTimeout(function () {
        preloader.style.display = "none";
        container.classList.add("show"); // Add this line
        document.body.style.overflow = "overlay"; // Revert overflow to show scrollbar
    }, 3000);
});


