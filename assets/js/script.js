// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {

  let cursr = document.querySelector("#cursor")
  let cursrbck = document.querySelector("#cursorbck")
  document.addEventListener("mousemove", function (position) {
    cursr.style.left = position.x + 15 + "px"
    cursr.style.top = position.y + "px"
    cursrbck.style.left = position.x - 225 + "px"
    cursrbck.style.top = position.y - 225 + "px"
  })


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
  });


  // Section horizontal scroll
  const horizontalSections = gsap.utils.toArray('section.horizontal');
  horizontalSections.forEach(function (sec, i) {
    let thisPinWrap = sec.querySelector('.pin-wrap');
    let thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');
    let getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

    gsap.fromTo(thisAnimWrap, {
      x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
    }, {
      x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top top+=0",
        end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
        pin: thisPinWrap,
        invalidateOnRefresh: true,
        scrub: true,
        touch: true,
      }
    });
  });


  // Add an event listener to the login/logout button
  const loginButton = document.querySelector(".login-button");
  loginButton.addEventListener("click", toggleLoginLogout);

  // Check if the user is logged in during page load
  const user = JSON.parse(localStorage.getItem("user"));
  updateLoginStatus(user);

  function toggleLoginLogout() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // If logged in, perform logout
      logout();
    } else {
      // If not logged in, show/hide login box
      toggleButtons();
    }
  }


  const logoutPopup = document.getElementById("logoutPopup");
  function logout() {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Update UI to reflect logout
    document.getElementById("logoutResultParagraph").innerText = "Logout successful. Goodbye!";

    // Open the logout popup
    openLogoutPopup();

    // Update UI to reflect logout
    updateLoginStatus(null);
  }


  function updateLoginStatus(user) {
    if (user) {
      // If user is logged in
      loginButton.innerText = "Log Out";
      document.getElementById("userName").innerText = user.name;
      document.getElementById("userImage").src = user.image;
    } else {
      // If user is not logged in
      loginButton.innerText = "Login/Sign Up";
      document.getElementById("userName").innerText = "User";
      document.getElementById("userImage").src = "/assets/images/user.png";
    }
  }


  function openLogoutPopup() {
    logoutPopup.style.display = "flex";
    logoutPopup.style.opacity = 1;
  }


  function closeLogoutPopup() {
    logoutPopup.style.opacity = 0;
    setTimeout(function () {
      logoutPopup.style.display = "none";
    }, 500);
  }

  document.querySelector(".logoutButton").addEventListener("click", closeLogoutPopup);


  let loginBoxVisible = false;

  function toggleButtons() {
    let loginBox = document.getElementById("login");

    if (loginBoxVisible) {
      // If login box is visible, hide it
      loginBox.style.opacity = 0;
      setTimeout(function () {
        loginBox.style.display = 'none';
      }, 500);

      // Change login/logout button text based on login status
      const user = JSON.parse(localStorage.getItem("user"));
      loginButton.innerText = user ? "Log Out" : "Login/Sign Up";

      // Update the flag
      loginBoxVisible = false;
    } else {
      // If login box is not visible, show it
      loginButton.innerText = "Close"; // Change login/logout button text to "Close"
      loginBox.style.display = 'block';
      setTimeout(function () {
        loginBox.style.opacity = 1;
      }, 10);

      // Update the flag
      loginBoxVisible = true;
    }
  }


  // Function to open cart modal
  function openCartModal() {
    document.getElementById('cartModal').classList.add('active');
  }

  // Function to close cart modal
  function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
  }

  document.querySelector(".cart-icon-container").addEventListener("click", openCartModal);
  document.querySelector(".modal-close").addEventListener("click", closeCartModal);

  function openPopup() {
    let signInPopup = document.getElementById("signInPopup");
    signInPopup.style.display = "flex";
    signInPopup.style.opacity = 1;  // Set opacity immediately without delay
  }


  function closePopup() {
    let signInPopup = document.querySelector(".signInPopup");
    let loginBox = document.getElementById("login");
    signInPopup.style.opacity = 0;
    setTimeout(function () {
      toggleButtons();
      loginBox.style.display = 'none';
      signInPopup.style.display = 'none';
    }, 500);
  }

  document.querySelector(".popUpButton").addEventListener("click", closePopup);

  // Function to open the modal
  function openModal() {
    document.getElementById('disclaimerModal').style.display = 'block';
  }

  // Function to close the modal
  function closeModal() {
    document.getElementById('disclaimerModal').style.display = 'none';
  }

  document.querySelector(".modalButton").addEventListener("click", openModal);
  document.querySelector(".modalClose").addEventListener("click", closeModal);

  // Optional: Close the modal if the user clicks outside of it
  window.onclick = function (event) {
    let modal = document.getElementById('disclaimerModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  // Add an event listener to the window for the 'beforeunload' event
  window.addEventListener('beforeunload', function () {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  });

  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event) {
    if (event.data && event.data.type === "userLoggedIn") {
      const user = event.data.user;

      // Check if the user object is defined before accessing its properties
      if (user) {
        const userName = user.name || "User"; // Provide a default value if 'name' is undefined
        const userImage = user.image || "/assets/images/user.png"; // Provide a default image if 'image' is undefined

        document.getElementById("resultParagraph").innerText = `Login successful. Welcome, ${userName}!`;
        openPopup();
        document.getElementById("userName").innerText = userName;
        document.getElementById("userImage").src = userImage;
      } else {
        console.error("Received message without a valid user object:", event.data);
      }
    } else if (event.data && event.data.type === "userRegistered") {
      const user = event.data.user;

      // Check if the user object is defined before accessing its properties
      if (user) {
        const userName = user.name || "User"; // Provide a default value if 'name' is undefined
        const userImage = user.image || "/assets/images/user.png"; // Provide a default image if 'image' is undefined

        document.getElementById("resultParagraph").innerHTML = `Sign Up Successful. Welcome, ${userName}!</br> Please Log In`;
        openPopup();
        document.getElementById("userName").innerText = userName;
        document.getElementById("userImage").src = userImage;
      } else {
        console.error("Received message without a valid user object:", event.data);
      }
    }
  }

});
// GO TO TOP
function goToTop() {
  // Scroll to the top of the page with a smooth animation
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add a scroll event listener to the window
window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY || window.pageYOffset;
  let goToTopButton = document.getElementById('goToTopButton');

  // Check if the scroll position is greater than a certain threshold (e.g., 500 pixels)
  if (scrollPosition > 500) {
    // If true, show the "Go to Top" button
    goToTopButton.style.display = 'block';
  } else {
    // If false, hide the "Go to Top" button
    goToTopButton.style.display = 'none';
  }
});

// Get all sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Add click event listeners to each link
sidebarLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    // Get the category from the data attribute
    const category = this.getAttribute('data-category');

    // Find the corresponding blank section
    const blankSections = document.querySelectorAll('.blank h1');

    // Iterate through the sections to find the one that contains the category
    let targetBlankSection;
    blankSections.forEach(section => {
      if (section.textContent.includes(category)) {
        targetBlankSection = section;
      }
    });

    // Scroll to the blank section
    if (targetBlankSection) {
      targetBlankSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
