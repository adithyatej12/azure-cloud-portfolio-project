// ---------- typing effect in hero ----------
const roles = ["Cloud Engineer", "DevOps Engineer", "Container Enthusiast", "CI/CD Builder"];
const typeTarget = document.getElementById("typeTarget");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ---------- hero network graphic: light up nodes on a loop ----------
const nodes = document.querySelectorAll("#nodeSvg .node:not(.node-core)");
let litIndex = 0;
setInterval(() => {
  nodes.forEach((n) => n.classList.remove("lit"));
  nodes[litIndex].classList.add("lit");
  litIndex = (litIndex + 1) % nodes.length;
}, 900);

// ---------- active nav link on scroll ----------
const sections = document.querySelectorAll("main .section");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);
sections.forEach((section) => observer.observe(section));

// ---------- mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinksEl = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  navLinksEl.classList.toggle("open");
});
navLinksEl.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinksEl.classList.remove("open"));
});

// ---------- expandable project cards ----------
document.querySelectorAll(".project-card").forEach((card) => {
  const toggle = () => card.classList.toggle("open");
  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
});

// ---------- back to top ----------
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
