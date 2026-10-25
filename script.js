/* =========================================
   TYPING ANIMATION
========================================= */
const words = ['Full-Stack Developer', 'Web Developer', 'Laravel Developer', 'React Developer'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const word = words[wi];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length)  { deleting = true; setTimeout(type, 1600); return; }
  if (deleting && ci < 0)             { deleting = false; wi = (wi + 1) % words.length; }
  setTimeout(type, deleting ? 50 : 100);
}
if (typedEl) type();

/* =========================================
   THEME TOGGLE
========================================= */
const themeToggle = document.getElementById('theme-toggle');
const savedTheme  = localStorage.getItem('theme');

if (savedTheme === 'light') document.body.classList.add('light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

/* =========================================
   NAV - SCROLL SHRINK + ACTIVE LINK
========================================= */
const header   = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  /* shrink header */
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);

  /* back to top button */
  const backTop = document.getElementById('back-top');
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);

  /* active nav link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* =========================================
   MOBILE NAV TOGGLE
========================================= */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('.nav__link').forEach(link =>
    link.addEventListener('click', () => navMenu.classList.remove('open'))
  );
  /* close on outside click */
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* =========================================
   SCROLL REVEAL
========================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* also add reveal to cards not already marked */
document.querySelectorAll(
  '.about__card, .skill__icon-card, .project__card, .edu__card, .cert__card, .contact__card'
).forEach(el => {
  if (!el.classList.contains('reveal')) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  }
});
