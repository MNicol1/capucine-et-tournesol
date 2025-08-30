// JS for copyright year
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Intersection Observer for scroll
const navLinks = document.querySelectorAll(".section-nav a");
const sections = document.querySelectorAll(".page-content section");

let activeId = null;

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id !== activeId) {
          activeId = id;
          for (const link of navLinks) {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);

            // 👇 Auto-scroll nav on mobile when a link becomes active
            if (isActive && window.innerWidth <= 1024) {
              link.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }
          }
        }
        break;
      }
    }
  },
  {
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0, // simple + reliable
  }
);

for (const section of sections) {
  observer.observe(section);
}

for (const link of navLinks) {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    activeId = id;
    for (const l of navLinks) {
      l.classList.toggle("active", l === link);
    }
    // 👇 Also scroll into view on click (mobile)
    if (window.innerWidth <= 1024) {
      link.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  });
}
