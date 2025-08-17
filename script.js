// Language Toggle
const langToggle = document.getElementById("langToggle");
const html = document.documentElement;
let isArabic = true;

langToggle.addEventListener("click", () => {
  isArabic = !isArabic;

  if (isArabic) {
    html.setAttribute("lang", "ar");
    // html.setAttribute('dir', 'rtl');
    document
      .querySelectorAll(".ar-text")
      .forEach((el) => el.classList.remove("hidden"));
    document
      .querySelectorAll(".en-text")
      .forEach((el) => el.classList.add("hidden"));
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    document
      .querySelectorAll(".ar-text")
      .forEach((el) => el.classList.add("hidden"));
    document
      .querySelectorAll(".en-text")
      .forEach((el) => el.classList.remove("hidden"));
  }
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
let isDark = true;

themeToggle.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    body.className = "gradient-bg text-white transition-all duration-300";
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.className = "bg-gray-100 text-gray-900 transition-all duration-300";
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';

    // Update sections for light mode
    document.querySelectorAll(".bg-dark-secondary").forEach((el) => {
      el.classList.remove("bg-dark-secondary");
      el.classList.add("bg-white", "shadow-lg");
    });

    document.querySelectorAll(".bg-dark-accent").forEach((el) => {
      el.classList.remove("bg-dark-accent");
      el.classList.add("bg-gray-200");
    });
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  const icon = mobileMenuBtn.querySelector("i");
  if (mobileMenu.classList.contains("hidden")) {
    icon.className = "fas fa-bars";
  } else {
    icon.className = "fas fa-times";
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.querySelector("i").className = "fas fa-bars";
    }
  });
});

// Active Navigation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-primary");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-primary");
    }
  });
});

// Form Submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(isArabic ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!");
});

// document.querySelector("form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   emailjs.sendForm("service_9zg6ide", "template_00nb0tt", this)
//     .then(() => {
//       alert(isArabic ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!");
//     }, (error) => {
//       alert(isArabic? "فشل الإرسال: " + JSON.stringify(error): "Failed to send: " + JSON.stringify(error));
//     });
// });

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
