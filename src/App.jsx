import { useEffect, useRef, useState } from 'react';

const typedWords = ['Full-Stack Developer', 'Web Developer', 'Laravel Developer', 'React Developer'];

function App() {
  const [typedText, setTypedText] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const typeNextCharacter = () => {
      const word = typedWords[wordIndex];
      charIndex += deleting ? -1 : 1;
      setTypedText(word.slice(0, charIndex));

      let delay = deleting ? 50 : 100;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typedWords.length;
      }
      timer = window.setTimeout(typeNextCharacter, delay);
    };

    timer = window.setTimeout(typeNextCharacter, 100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 40);
      setShowBackTop(window.scrollY > 400);
      let currentSection = '';
      document.querySelectorAll('section[id]').forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) currentSection = section.id;
      });
      setActiveSection(currentSection || 'home');
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('click', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('click', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .about__card, .skill__icon-card, .project__card, .edu__card, .cert__card, .contact__card').forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  const handleImageError = (event) => {
    event.currentTarget.style.display = 'none';
    event.currentTarget.parentElement?.classList.add('img-fallback');
  };

  return (
    <div className="min-h-screen">



<header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
  <nav className="nav container" ref={navRef}>
    <a href="#home" className="nav__logo">
      <span className="logo__box">TK</span>
    </a>

    <ul className={`nav__menu${menuOpen ? ' open' : ''}`} id="nav-menu">
      <li><a href="#home" className={`nav__link${activeSection === 'home' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Home</a></li>
      <li><a href="#about" className={`nav__link${activeSection === 'about' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>About</a></li>
      <li><a href="#skills" className={`nav__link${activeSection === 'skills' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Skills</a></li>
      <li><a href="#projects" className={`nav__link${activeSection === 'projects' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Projects</a></li>
      <li><a href="#education" className={`nav__link${activeSection === 'education' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Education</a></li>
      <li><a href="#contact" className={`nav__link${activeSection === 'contact' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Contact</a></li>
    </ul>

    <div className="nav__right">
      <button className="theme__toggle" id="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
        <svg className="icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
      <button className="nav__toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</header>


<section className="hero" id="home">
  <div className="hero__particles" id="particles"></div>

  <div className="container hero__container">
    <div className="hero__text">
      <div className="hero__badge">
        <span className="badge__dot"></span>
        Full-Stack Developer
      </div>
      <p className="hero__greeting">Hello, I'm</p>
      <h1 className="hero__name">Teang <span>Keangan</span></h1>
      <p className="hero__role">I'm a <span className="typed">{typedText}</span><span className="cursor"></span></p>
      <p className="hero__desc">A passionate Full-Stack Developer with a strong interest in building modern web applications. I'm currently looking for a Full-Stack Developer Internship in Phnom Penh to learn, grow, and contribute to real-world projects.</p>

      <div className="hero__actions">
        <a href="#projects" className="btn btn--primary">View My Projects &rarr;</a>
        <a href="assets/Resume_teangkeangan 1.pdf" download className="btn btn--ghost">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download CV
        </a>
      </div>

      <div className="hero__info-row">
        <span className="info__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          teangkeangan@gmail.com
        </span>
        <span className="info__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Phnom Penh, Cambodia
        </span>
        <span className="info__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          DOB: 22 Aug 2004
        </span>
      </div>
    </div>

    <div className="hero__image">
      <div className="hero__img-glow"></div>
      <div className="hero__img-ring">
        <img src="images/photo_2025-08-08_16-39-28.jpg" alt="Teang Keangan" onError={handleImageError} />
      </div>
      <div className="hero__corner-text">
        <span>Build</span>
        <span>Better</span>
        <span className="accent-text">Web Apps</span>
      </div>
    </div>
  </div>
</section>


<section className="section" id="about">
  <div className="container">
    <div className="section__header">
      <h2 className="section__title">About <span>Me</span></h2>
      <div className="section__line"></div>
    </div>

    <div className="about__grid">
      <div className="about__text">
        <p className="about__desc">I'm Teang Keangan, a web development student specializing in Web Development and App Development. I enjoy turning ideas into real applications using modern technologies.</p>
        <p className="about__desc">I have hands-on experience with React, Node.js, Laravel, and MySQL, and I'm eager to learn more, work with a professional team, and gain practical experience through an internship.</p>

        <div className="about__tags">
          <span className="about__tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            Student
          </span>
          <span className="about__tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Web &amp; App Developer
          </span>
          <span className="about__tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Phnom Penh
          </span>
        </div>
      </div>

      <div className="about__cards">
        <div className="about__card">
          <div className="about__card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div>
            <h4>Problem Solver</h4>
            <p>I enjoy finding simple solutions for complex problems.</p>
          </div>
        </div>
        <div className="about__card">
          <div className="about__card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h4>Team Player</h4>
            <p>I work well with others and value good communication.</p>
          </div>
        </div>
        <div className="about__card">
          <div className="about__card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div>
            <h4>Continuous Learner</h4>
            <p>Always learning new technologies and improving my skills.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="section section--alt" id="skills">
  <div className="container">
    <div className="section__header">
      <h2 className="section__title">My <span>Skills</span></h2>
      <div className="section__line"></div>
      <p className="section__sub">Technologies and tools I use to build web applications</p>
    </div>

    <div className="skills__categories">

      <div className="skills__category">
        <h3 className="skills__cat-title">Frontend</h3>
        <div className="skills__icons">
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--react">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>
            </div>
            <span>React</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--tailwind">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>
            </div>
            <span>Tailwind CSS</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--js">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>
            </div>
            <span>JavaScript</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--html">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z"/></svg>
            </div>
            <span>HTML</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--css">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z"/></svg>
            </div>
            <span>CSS</span>
          </div>
        </div>
      </div>

      <div className="skills__category">
        <h3 className="skills__cat-title">Backend &amp; Database</h3>
        <div className="skills__icons">
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--laravel">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027c-.008.002-.016.008-.024.01a.348.348 0 0 1-.188 0c-.010-.002-.017-.008-.026-.01a.316.316 0 0 1-.065-.027L.533 18.755a.378.378 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 0 1 .076-.124c.011-.01.02-.022.033-.032L4.7.092a.378.378 0 0 1 .378 0l4.248 2.456L9.328 2.55zm-1.378 4.624v-4.03l-1.806 1.042v4.03zm-4.501 2.59v-4.03L9.95 10.67v4.03zm-4.501 5.382V13.96L9.57 15.002 9.328 2.55 5.07 4.924v4.03zm-8.882-10.74V5.79l-.533.307V12.1zm4.888 0L9.27 5.006 5.07 2.55 1.32 4.626v4.03l3.753 2.173V10.43zm8.882 5.382V10.43l-3.753-2.173v4.03zm-4.501-2.589v4.03l3.753 2.173V9.83z"/></svg>
            </div>
            <span>Laravel</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--node" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.7 2.5 7.2v9.6l9.5 5.5 9.5-5.5V7.2L12 1.7zm0 2.3 7.5 4.3v7.4L12 20l-7.5-4.3V8.3L12 4zm-3.4 6.1v4.8h1.7v-2.8l2.2 2.8h1.5v-4.8h-1.7v2.7l-2.1-2.7H8.6z"/></svg>
            </div>
            <span>Node.js</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--mysql">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.01l-1.524 4.41H2.15l-1.523-4.41h-.013a43.82 43.82 0 0 0-.253 4.41H.004c.073-1.828.187-3.587.373-5.332h1.35l1.41 4.073h.01l1.41-4.073h1.317c.2 1.745.313 3.504.387 5.332zm4.362 0h-1.1l-.01-4.123h-.006l-1.407 4.123H6.76l-1.4-4.123h-.006v4.123H4.367v-5.332h1.635l1.306 3.8h.01l1.306-3.8H10.13v5.332zm8.12 0h-3.065v-5.332h.985v4.44h2.08v.892zm4.334-1.604c0 .974-.613 1.694-1.864 1.694-.457 0-.9-.087-1.28-.272v-.86c.42.22.847.367 1.313.367.56 0 .8-.234.8-.666 0-.41-.28-.614-.9-.9-.867-.4-1.227-.873-1.227-1.534 0-.854.613-1.52 1.8-1.52.42 0 .847.073 1.2.22v.84c-.366-.18-.8-.294-1.213-.294-.547 0-.773.233-.773.607 0 .4.28.58.834.833.913.406 1.307.886 1.307 1.685z"/></svg>
            </div>
            <span>MySQL</span>
          </div>
        </div>
      </div>

      <div className="skills__category">
        <h3 className="skills__cat-title">Tools &amp; Others</h3>
        <div className="skills__icons">
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--git">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>
            </div>
            <span>Git</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--vscode">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>
            </div>
            <span>VS Code</span>
          </div>
          <div className="skill__icon-card">
            <div className="skill__icon skill__icon--postman">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643 4.453-4.453a.858.858 0 0 1 1.211 1.211l-.668-.511zM7.73 13.01l4.82 4.82a.855.855 0 0 1-1.21 1.21L6.52 14.22l1.21-1.21zm5.31 5.311a.858.858 0 0 1-1.21 0l-4.82-4.82a.857.857 0 0 1 0-1.21l.607-.607 5.423 5.427zm-.307-6.523l-4.453 4.453-.307-.307 4.453-4.453.307.307zm5.03-1.617l-.607.607-5.427-5.427.607-.607a.857.857 0 0 1 1.21 0l4.217 4.217a.857.857 0 0 1 0 1.21z"/></svg>
            </div>
            <span>Postman</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


<section className="section" id="projects">
  <div className="container">
    <div className="section__header">
      <h2 className="section__title">My <span>Projects</span></h2>
      <div className="section__line"></div>
      <p className="section__sub">Some of my recent projects. More projects coming soon!</p>
    </div>

    <div className="projects__header-row">
      <a href="#" className="view-all-link">View All Projects &rarr;</a>
    </div>

    <div className="projects__grid">

      <div className="project__card reveal">
        <div className="project__thumb project__thumb--1">
          <div className="project__screenshot">
            <div className="screenshot__bar">
              <span></span><span></span><span></span>
            </div>
            <div className="screenshot__content">
              <div className="sc__row sc__header"></div>
              <div className="sc__body">
                <div className="sc__sidebar"></div>
                <div className="sc__main">
                  <div className="sc__card"></div>
                  <div className="sc__card"></div>
                  <div className="sc__table"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="project__type-badge">Full-Stack</div>
          <a href="#" className="project__ext-link" title="Open project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
        <div className="project__body">
          <h3>POS System (Mini Mart)</h3>
          <p>A Point of Sale system for small business with admin and cashier roles, product management, receipt printing (80mm).</p>
          <div className="project__actions">
            <span className="project__action" title="Add a video URL to enable this">Video coming soon</span>
            <span className="project__action" title="Add a project URL to enable this">Project link coming soon</span>
          </div>
          <div className="project__tags">
            <span className="tag tag--react">#React</span>
            <span className="tag tag--laravel">#Laravel</span>
            <span className="tag tag--mysql">#MySQL</span>
          </div>
        </div>
      </div>

      <div className="project__card reveal">
        <div className="project__thumb project__thumb--2">
          <div className="project__screenshot">
            <div className="screenshot__bar">
              <span></span><span></span><span></span>
            </div>
            <div className="screenshot__content">
              <div className="sc__row sc__header"></div>
              <div className="sc__body">
                <div className="sc__sidebar"></div>
                <div className="sc__main">
                  <div className="sc__card"></div>
                  <div className="sc__card"></div>
                  <div className="sc__table"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="project__type-badge">Full-Stack</div>
          <a href="#" className="project__ext-link" title="Open project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
        <div className="project__body">
          <h3>Library Book Store</h3>
          <p>Book management system with Oracle database, barcode stock-in, and inventory tracking.</p>
          <div className="project__actions">
            <span className="project__action" title="Add a video URL to enable this">Video coming soon</span>
            <span className="project__action" title="Add a project URL to enable this">Project link coming soon</span>
          </div>
          <div className="project__tags">
            <span className="tag tag--laravel">#Laravel</span>
            <span className="tag tag--oracle">#Oracle</span>
            <span className="tag tag--mysql">#MySQL</span>
          </div>
        </div>
      </div>

      <div className="project__card reveal">
        <div className="project__thumb project__thumb--3">
          <div className="project__screenshot">
            <div className="screenshot__bar">
              <span></span><span></span><span></span>
            </div>
            <div className="screenshot__content">
              <div className="sc__row sc__header"></div>
              <div className="sc__body">
                <div className="sc__sidebar"></div>
                <div className="sc__main">
                  <div className="sc__card"></div>
                  <div className="sc__card"></div>
                  <div className="sc__table"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="project__type-badge">Full-Stack</div>
          <a href="#" className="project__ext-link" title="Open project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
        <div className="project__body">
          <h3>Asset &amp; Inventory Management</h3>
          <p>Track office supplies, assets, and stock with barcode and reporting features.</p>
          <div className="project__actions">
            <span className="project__action" title="Add a video URL to enable this">Video coming soon</span>
            <span className="project__action" title="Add a project URL to enable this">Project link coming soon</span>
          </div>
          <div className="project__tags">
            <span className="tag tag--laravel">#Laravel</span>
            <span className="tag tag--mysql">#MySQL</span>
            <span className="tag tag--tailwind">#Tailwind CSS</span>
          </div>
        </div>
      </div>

      <div className="project__card reveal">
        <div className="project__thumb project__thumb--4">
          <div className="project__screenshot">
            <div className="screenshot__bar">
              <span></span><span></span><span></span>
            </div>
            <div className="screenshot__content">
              <div className="sc__row sc__header"></div>
              <div className="sc__body">
                <div className="sc__sidebar"></div>
                <div className="sc__main">
                  <div className="sc__card"></div>
                  <div className="sc__card"></div>
                  <div className="sc__table"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="project__type-badge">Frontend</div>
        </div>
        <div className="project__body">
          <h3>Portfolio Website</h3>
          <p>A personal portfolio showcasing my skills, projects, and contact information.</p>
          <div className="project__actions">
            <span className="project__action" title="Add a video URL to enable this">Video coming soon</span>
            <span className="project__action" title="Add a project URL to enable this">Project link coming soon</span>
          </div>
          <div className="project__tags">
            <span className="tag tag--react">#React</span>
            <span className="tag tag--tailwind">#Tailwind CSS</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


<section className="section section--alt" id="education">
  <div className="container">
    <div className="section__header">
      <h2 className="section__title">My <span>Education</span></h2>
      <div className="section__line"></div>
      <p className="section__sub">My academic background and certifications</p>
    </div>

    <div className="education__grid">
      <div className="education__col">

        <div className="edu__card reveal">
          <div className="edu__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div className="edu__content">
            <span className="edu__year">2024 – 2026 (Expected)</span>
            <h4>Diploma in Computer Science</h4>
            <p>BELTEI International University, Campus 2</p>
            <p>Build skills in web development, database, and computer science</p>
          </div>
        </div>

        <div className="edu__card reveal">
          <div className="edu__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div className="edu__content">
            <span className="edu__year">2017 – 2022</span>
            <h4>Cheasim Sammarki High School</h4>
            <p>Completed high school education in Cambodia.</p>
          </div>
        </div>

      </div>

      <div className="education__col">
        <div className="cert__card reveal">
          <h4 className="cert__title">Certifications &amp; Learning</h4>
          <ul className="cert__list">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
              React (Self Learning)
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
              Laravel (Self Learning)
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
              Node.js (Self Learning)
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
              MySQL (Self Learning)
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
              HTML, CSS, JavaScript (Self Learning)
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
              Git &amp; GitHub (Self Learning)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="section" id="contact">
  <div className="container">
    <div className="section__header">
      <h2 className="section__title">Get In <span>Touch</span></h2>
      <div className="section__line"></div>
      <p className="section__sub">Feel free to contact me for internship opportunities, collaborations, or just to say hello!</p>
    </div>

    <div className="contact__grid">
      <div className="contact__info-cards">
        <div className="contact__card reveal">
          <div className="contact__card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <span className="contact__card-label">Email</span>
            <a href="mailto:teangkeangan@gmail.com" className="contact__card-value">teangkeangan@gmail.com</a>
          </div>
        </div>

        <div className="contact__card reveal">
          <div className="contact__card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <span className="contact__card-label">Location</span>
            <span className="contact__card-value">Phnom Penh, Cambodia</span>
          </div>
        </div>

        <div className="contact__card reveal">
          <div className="contact__card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </div>
          <div>
            <span className="contact__card-label">Telegram</span>
            <a href="https://t.me/Keangarn" className="contact__card-value">@Keangarn</a>
          </div>
        </div>
      </div>

      <div className="contact__right reveal">
        <div className="contact__cta-box">
          <div className="cta__icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </div>
          <h3>Let's Work Together</h3>
          <p>I'm always open to new opportunities and exciting projects.</p>
          <a href="https://t.me/Keangarn" className="btn btn--primary" target="_blank" rel="noopener noreferrer">Send Message &rarr;</a>
        </div>
      </div>
    </div>
  </div>
</section>


<footer className="footer">
  <div className="container footer__inner">
    <a href="#home" className="footer__logo">
      <span className="logo__box">TK</span>
      <span className="footer__logo-name">Teang Keangan</span>
    </a>

    <p className="footer__copy">&copy; 2025 Teang Keangan. All rights reserved.</p>

    <div className="footer__socials">
      <a href="https://github.com/" className="footer__social" title="GitHub" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
      </a>
      <a href="https://www.linkedin.com/" className="footer__social" title="LinkedIn" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="https://t.me/Keangarn" className="footer__social" title="Telegram" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22 2 11 13m11-11-7 20-4-9-9-4 20-7z"/></svg>
      </a>
    </div>
  </div>
</footer>


<a href="#home" className={`back-top${showBackTop ? ' visible' : ''}`} id="back-top" title="Back to top">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><polyline points="18 15 12 9 6 15"/></svg>
</a>



    </div>
  );
}

export default App;
