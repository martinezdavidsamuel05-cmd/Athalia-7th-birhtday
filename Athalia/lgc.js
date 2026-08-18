const CONFIG = {
  birthdayDate: "[Saturday, September 12, 2026]",     // e.g. "Saturday, March 14, 2026 · 2:00 PM"
  venueName: "[Kidzoona, SM Sta. Mesa, Manila]",
  venueAddress: "[INSERT VENUE ADDRESS]",
  dressCode: "Pastel Candy Colors",
  googleMapsQuery: "Candyland Party Venue",   // used to build the map + "open in maps" link
  googleFormUrl: "https://forms.gle/uA2Z64RzB5qwLtFD6", // EDIT: paste your real Google Form link here
  musicSrc: "assets/background-music.mp3",
  reducedMotionParticleCount: 8,
  particleCount: 26,
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------
   2. HERO ENTRANCE
   --------------------------------------------------------------------- */
function setMusicIconState(playing) {
  const iconOn = document.getElementById("music-icon-on");
  const iconOff = document.getElementById("music-icon-off");
  if (!iconOn || !iconOff) return;
  iconOn.classList.toggle("hidden", !playing);
  iconOff.classList.toggle("hidden", playing);
}

function initHeroEntrance() {
  const hero = document.getElementById("hero");
  const enterBtn = document.getElementById("enter-btn");
  const navbar = document.getElementById("navbar");
  const musicToggle = document.getElementById("music-toggle");
  const siteMain = document.getElementById("site-main");
  const music = document.getElementById("bg-music");

  enterBtn.addEventListener("click", () => {
    // 1. Start music (browsers allow this because it's a direct user gesture)
    music.volume = 0.55;
    music.play().catch(() => {
      // Autoplay may still fail silently on some browsers; the music
      // button remains available so the user can start it manually.
    });
    musicToggle.setAttribute("aria-pressed", "true");
    setMusicIconState(true);

    // 2. Animate hero out
    hero.classList.add("exiting");

    // 3. Reveal main site + navbar + music button after the exit animation
    setTimeout(() => {
      hero.classList.add("hidden-hero");
      siteMain.classList.remove("hidden");
      navbar.classList.remove("hidden");
      musicToggle.classList.remove("hidden");
      document.body.style.overflow = "auto";

      // 4. Start floating particles
      startParticles();
    }, prefersReducedMotion ? 50 : 900);
  });
}

/* ---------------------------------------------------------------------
   3. MUSIC CONTROL
   --------------------------------------------------------------------- */
function initMusicToggle() {
  const musicToggle = document.getElementById("music-toggle");
  const music = document.getElementById("bg-music");

  musicToggle.addEventListener("click", () => {
    const isPlaying = !music.paused;
    if (isPlaying) {
      music.pause();
      setMusicIconState(false);
      musicToggle.setAttribute("aria-pressed", "false");
    } else {
      music.play().catch(() => {});
      setMusicIconState(true);
      musicToggle.setAttribute("aria-pressed", "true");
    }
  });
}

/* ---------------------------------------------------------------------
   4. NAVBAR: mobile menu + smooth scroll + active section highlight
   --------------------------------------------------------------------- */
function initNavbar() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    if (isOpen) {
      mobileMenu.style.maxHeight = "0px";
      mobileMenu.style.opacity = "0";
      mobileMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    } else {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      mobileMenu.style.opacity = "1";
      mobileMenu.classList.add("open");
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.textContent = "✕";
    }
  });

  // Close mobile menu after tapping a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.style.maxHeight = "0px";
      mobileMenu.style.opacity = "0";
      mobileMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });

  // Highlight active nav link based on scroll position
  const sections = ["home", "details", "traditions", "gallery", "venue", "rsvp"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => highlightObserver.observe(section));
}

/* ---------------------------------------------------------------------
   5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
   --------------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in-view"), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   6. FLOATING PARTICLES (confetti / sprinkles / hearts / stars)
   --------------------------------------------------------------------- */
const PARTICLE_SHAPES = ["🍬", "✨", "💗", "⭐", "🍭", "●", "🩵"];
const PARTICLE_COLORS = ["#FF8FB3", "#C9A6FF", "#CFE9FF", "#C7F4E1", "#FFD9E8", "#E3BE6E"];

function startParticles() {
  const field = document.getElementById("particle-field");
  const count = prefersReducedMotion ? CONFIG.reducedMotionParticleCount : CONFIG.particleCount;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";

    const shape = PARTICLE_SHAPES[Math.floor(Math.random() * PARTICLE_SHAPES.length)];
    const isEmoji = shape !== "●";
    const size = 10 + Math.random() * 14;
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay = Math.random() * 12;
    const drift = (Math.random() - 0.5) * 160;

    particle.textContent = shape;
    particle.style.left = `${left}vw`;
    particle.style.fontSize = isEmoji ? `${size}px` : "0";
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.setProperty("--drift", `${drift}px`);

    if (!isEmoji) {
      // plain circle "sprinkle"
      particle.style.width = `${size / 1.6}px`;
      particle.style.height = `${size / 1.6}px`;
      particle.style.borderRadius = "999px";
      particle.style.background = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    }

    field.appendChild(particle);
  }
}

/* ---------------------------------------------------------------------
   7. GALLERY LIGHTBOX
   --------------------------------------------------------------------- */
function initGalleryLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const cards = document.querySelectorAll(".gallery-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const fullSrc = card.dataset.full;
      lightboxImg.src = fullSrc;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    lightboxImg.src = "";
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox();
  });
}

/* ---------------------------------------------------------------------
   8. VENUE + RSVP: apply CONFIG to map and RSVP link
   --------------------------------------------------------------------- */
function applyConfigToDOM() {
  const mapIframe = document.querySelector('iframe[title="Venue location map"]');
  const mapsLink = document.getElementById("maps-link");
  const query = encodeURIComponent(CONFIG.googleMapsQuery);

  if (mapIframe) mapIframe.src = `https://www.google.com/maps?q=${query}&output=embed`;
  if (mapsLink) mapsLink.href = `https://www.google.com/maps?q=${query}`;

  const rsvpLink = document.getElementById("rsvp-form-link");
  if (rsvpLink) rsvpLink.href = CONFIG.googleFormUrl;
}

/* ---------------------------------------------------------------------
   INIT
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden"; // locked while hero is showing
  applyConfigToDOM();
  initHeroEntrance();
  initMusicToggle();
  initNavbar();
  initScrollReveal();
  initGalleryLightbox();
});