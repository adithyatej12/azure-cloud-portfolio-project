// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav after a link is tapped
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the current section in the nav while scrolling
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
