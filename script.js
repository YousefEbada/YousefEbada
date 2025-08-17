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

// Theme Toggle - Using Tailwind's dark mode system
const themeToggle = document.getElementById("themeToggle");
let isDark = true;

// Check for saved theme preference or default to dark mode
if (localStorage.getItem('theme') === 'light') {
  isDark = false;
  html.classList.remove('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  isDark = true;
  html.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    html.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'light');
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
