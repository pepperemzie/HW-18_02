// Loading Animatipn

// Set style for each screen
let screen1 = gsap.set(".sc-1", {
  top: "-100%",
});
let screen2 = gsap.set(".sc-2", {
  right: "-100%",
});
let screen3 = gsap.set(".sc-3", {
  bottom: "-100%",
});

window.addEventListener("load", inTro);

function inTro() {
  document.body.classList.add("no_scroll");
  let screens = Array.from(
    document.querySelectorAll(".loading__screens .loading_screen")
  );
  let headings = Array.from(document.querySelectorAll(".loading_screen h3"));

  // Create timeline
  const tl = gsap.timeline({
    defaults: {
      duration: 1.3,
    },
    onStart: function () {
      gsap.set("#about", {
        scaleY: "0",
        transformOrigin: "bottom",
        opacity: 0,
      });
    },
  });

  let firstScreen = tl.to(".sc-1", {
    zIndex: 5,
    top: 0,
    ease: "elastic(10 , 20)",
    onStart: function () {
      animateText(".sc-1 h3 .char", "end", 30);
    },
  });

  let secondScreen = tl.to(".sc-2", {
    right: 0,
    zIndex: 10,
    ease: "power3.out",
    onStart: function () {
      animateText(".sc-2 h3 .char", "right", 70);
    },
  });
  let thirdScreen = tl.to(".sc-3", {
    bottom: 0,
    zIndex: 20,
    ease: "elastic(10 , 20)",
    onStart: function () {
      animateText(".sc-3 h3 .char", "center", 40, "back.out(2)");
    },
  });
  let lastScreen = tl.to(".sc-4", {
    
    scaleX:1 ,
    duration:.6 , 
    ease:"steps(5)" , 
    zIndex: 50,
    onComplete: function () {
      screens.forEach((sc) => sc.remove());
      document.body.classList.remove("no_scroll");
      gsap.to("#about", {
        scaleY: "1",
        transformOrigin: "bottom",
        opacity: 1,
      });

      document.body.classList.remove("no_scroll");

      // When loading screens are hidden animate about img
      gsap.from(".about_img", {
        opacity: 0,
        y: -40,
        rotateZ: 10,
        duration: 0.9,
        ease: "back.out(2)",
      });
    },
  } );

  function animateText(
    selector,
    isFrom = "start",
    playAfter = 0,
    ease = "elastic(5 , 1)"
  ) {
    setTimeout(() => {
      gsap.from(selector, {
        opacity: 0,
        ease: ease,
        y: 130,
        duration: 1,
        stagger: {
          amount: 0.2,
          from: isFrom,
        },
      });
    }, playAfter);
  }
}

// Split text into characters using with the desired target '.nav_link'
Splitting({
  target: ".nav_link",
  by: "chars",
});

// Create a timeline for the menu animation
const menuTl = gsap.timeline({
  paused: true,
});

// Get the header navigation element
const headerMenu = document.querySelector(".header_nav");

// Function to open the menu
function openMenu() {
  // Play the menu animation timeline
  menuTl.play();
  headerMenu.classList.add("is-visible");

  // Animate menu icon on click
  gsap.to("header .open_menu path", {
    scaleX: 0,
    transformOrigin: "right",
    stagger: {
      amount: 0.1,
    },
    ease: "back.out(2)",
  });

  // Animate the header menu to show
  gsap.to(headerMenu, {
    transformOrigin: "top",
    scaleY: 1,
    bottom: 0,
    zIndex: 999,

    visibility: "visible",
    duration: 0.5,
    ease: "back.out(1)",
  });

  // Animate navigation links to appear
  gsap.fromTo(
    "header .nav_link .char",
    {
      y: -60,
      opacity: 0,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "elastic(1 , .6)",
      stagger: {
        amount: 0.25,
      },
      delay: 0.2,
    }
  );

  // Animate close menu button
  gsap.fromTo(
    ".close_menu path",
    {
      opacity: 0,
      scale: 0,
    },
    {
      keyframes: [{ rotateX: -90 }, { rotateZ: 0 }, { scale: 1.3, scale: 1 }],

      opacity: 1,
      scale: 1,
      duration: 1.3,
      ease: "back.out(2)",
    }
  );
}

// Function to close the menu
function closeMenu() {
  headerMenu.classList.remove("is-visible");

  // Animate menu icon bars to reappear
  gsap.to("header .open_menu path", {
    scaleX: 1,
    transformOrigin: "right",
    stagger: {
      amount: 0.1,
    },
    ease: "back.out(2)",
  });

  // Animate header menu to hide
  gsap.to(headerMenu, {
    bottom: "-100%",
    duration: 0.5,
    ease: "power4.out",
  });
}

// When the page loads
window.addEventListener("load", () => {
  const loadTl = gsap.timeline();

  // Animate the logo on page load
  loadTl.from("header .logo", {
    x: -70,
    scale: 0.5,
    opacity: 0.3,
    ease: "back.out(3)",
  });

  // Animate menu icon bars on page load
  loadTl.from("header .open_menu path", {
    scaleX: 0,
    x: -10,
    transformOrigin: "right",
    stagger: {
      amount: 0.1,
    },
    ease: "back.out(2)",
  });

  // Check window width and animate navigation links if necessary
  if (window.innerWidth > 600) {
    let navLinks = Array.from(document.querySelectorAll("header .nav_link"));
    navLinks.forEach((link) => {
      let linkChar = link.querySelectorAll(".char");

      gsap.from(linkChar, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "elastic(.7, .8)",
        stagger: {
          amount: 0.2,
        },
      });
    });
  }
});

// Split text into words with the desired target
Splitting({
  target: `[data-p-animation="true"]`,
  by: "chars",
});

// Apply animation to each character  with data-p-animation='true'
document.querySelectorAll(`[data-p-animation="true"]`).forEach((paragraph) => {
  // CSS
  // paragraph.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`;

  // Select all words within the paragraph
  const paragraphWords = paragraph.querySelectorAll(".char");

  // Define GSAP animation for each word's characters
  const wordsAnimation = gsap.fromTo(
    paragraphWords,
    {
      opacity: 0,
      y: 60,
      color: "#f7afcd", // Initial text color
    },
    {
      color: "black", // Final text color
      opacity: 1,
      y: 0,
      duration: 1,
      ease: `elastic(1, .4)`,
      stagger: {
        amount: 0.3,
      },
      scrollTrigger: {
        trigger: paragraph,
        start: "top 80%", // Start animation when paragraph is 80% from the top
        end: "top center",
        scrub: 4,
        // toggleActions: "restart none reverse none", // Repeats the animation as the user scrolls again
      },
    }
  );
});

// Create animation for about img
let aboutImgOverlay = document.querySelector(
  ".about_section .img_overlay_animation"
);
let aboutImgAnimation = gsap.fromTo(
  aboutImgOverlay,
  {
    xPercent: 0,
  },
  {
    onStart: () => {
      gsap.from(".about_img", {
        scale: 0.9,

        ease: "back.in(1)",
        opacity: 0,
      });
    },

    xPercent: 100,
    scrollTrigger: {
      trigger: aboutImgOverlay,
      start: "top 20%",
      // scrub: 2,
      // pin:true  ,
    },
    duration: 1,
    ease: "power4.in",
  }
);

//

// Get all navigation links and sections
const navLinks = document.querySelectorAll("header .nav_link");
const sections = document.querySelectorAll("section[data-scrollable]");

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetSectionId = this.getAttribute("href");
    const targetSection = document.querySelector(targetSectionId);

    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    this.classList.add("active");

    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

const animationApplied = {};

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;

  // Check each section for visibility
  sections.forEach((section) => {
    const dataScrollValue = section.getAttribute("data-scroll");
    const correspondingLink = document.querySelector(
      `.nav_link[href="#${dataScrollValue}"]`
    );

    if (correspondingLink) {
      const sectionTop = section.offsetTop - 500; 
      const sectionBottom = sectionTop + section.offsetHeight;

      // If section is in view, highlight the corresponding link
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((navLink) => {
          navLink.classList.remove("active");
        });
        correspondingLink.classList.add("active");
      }
    }
  });
});

// Select all elements with data-heading-animation attribute
const headingElements = document.querySelectorAll("[data-heading-animation]");

// Loop through each heading element and apply animations
headingElements.forEach((heading) => {
  // Split the heading text into characters using Splitting.js
  const chars = Splitting({ target: heading, by: "chars" });

  headingChars = heading.querySelectorAll(".char");

  // Define GSAP animation for each character
  const charAnimation = gsap.fromTo(
    headingChars,
    {
      opacity: 0,
      color: "#f7afcd",
      x: 40,
      rotateZ: 3,
    },
    {
      rotateZ: 0,
      color: "black",
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "back.out(1)",
      stagger: {
        amount: 0.21,
      },
      scrollTrigger: {
        trigger: headingChars,
        start: "top 77%",
        scrub: 2,
      },
    }
  );
});

let skillsCards = document.querySelectorAll(
  "#skills .flex_child *  ,  .project_content * ,.project_img  , .contact_form"
);

skillsCards.forEach((card) => {
  // Set initial opacity to 0
  gsap.set(card, {
    opacity: 0,
  });

  // Apply animation
  gsap.fromTo(
    card,
    {
      opacity: 0,
      y: 40,
    },
    {
      stagger: {
        amount: 0.1,
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "back.out(3)",
      scrollTrigger: {
        trigger: card,
        start: "top 94%",
        end: "top 20%",
        scrub: 1,
      },
    }
  );
});
