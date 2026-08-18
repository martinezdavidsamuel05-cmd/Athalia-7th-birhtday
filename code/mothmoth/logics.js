/* =========================================================
   💕 MONTHSARY WEBSITE SETTINGS
   Edit everything in this section to make the site yours.
   ========================================================= */

// 🔐 Password to enter the site. Format suggestion: MMDDYYYY
// This is just a fun front-end surprise, not real security —
// anyone who reads this file can see it.
const correctPassword = "07172026";

// 📅 The date/time your relationship officially started.
// The countdown + "time spent loving you" counter use this.
const monthsaryDate = new Date("2026-07-17T00:00:00");

// 💑 Names shown throughout the site
const girlfriendName = "Nunie";
const yourName = "Sampo";

// 💌 Timeline events — add/remove/edit freely, they render automatically
const timelineEvents = [
  { date: "July 17, 2026", title: "The Beginning", desc: "Where our new chapter started." },
  { date: "March 8, 2024", title: "Our First Conversation", desc: "The first time we talked and somehow I knew you were special." },
  { date: "October 29, 2025", title: "Our First Date", desc: "One of the memories I'll always keep close to my heart." },
  { date: "July 17, 2026", title: "The Moment We Became Us", desc: "And suddenly, you weren't just someone I knew — you became someone I loved." },
  { date: "August 17, 2026", title: "Our First Monthsary", desc: "One month of us. And hopefully, countless more to come." },
];

// 📸 Gallery photos — put your files in /assets and list them here
const galleryPhotos = [
  { src: "assets/firtrip.jpg", caption: "The day I realized how lucky I am." },
  { src: "assets/coffee.jpg", caption: "One of my favorite days with you." },
  { src: "assets/fd.jpg", caption: "I still smile thinking about this one." },
  { src: "assets/gal2.jpg", caption: "You, being effortlessly you." },
  { src: "assets/cinema.jpg", caption: "This moment felt like a movie." },
  { src: "assets/herobg.jpg", caption: "A memory I never want to forget." },
];

// 🖼️ Polaroid photos
const polaroidPhotos = [
  { src: "assets/gal8.jpg", caption: "My favorite person" },
  { src: "assets/pola1.jpg", caption: "Where it all started" },
  { src: "assets/jog.jpg", caption: "Walking together" },
  { src: "assets/gal1.jpg", caption: "Just you and only you" },
];

// 💗 Reasons why you love her
const reasons = [
  { icon: "❤️", text: "Your smile" },
  { icon: "❤️", text: "Your kindness" },
  { icon: "❤️", text: "The way you make me laugh" },
  { icon: "❤️", text: "The way you care" },
  { icon: "❤️", text: "Your beautiful personality" },
  { icon: "❤️", text: "The way you make ordinary moments special" },
];

// ✨ Favorite memories — add up to 6 for the best layout
const favoriteMemories = [
  { img: "assets/firstd.jpg", date: "Where it all started", title: "Our First Date", desc: "That day wasn't perfect because everything went perfectly. It was perfect because I was with you." }, 
  { img: "assets/silly.jpg", date: "The silliness", title: "That Random Tuesday", desc: "Nothing special was planned, and it still turned into one of my favorite memories." },
  { img: "assets/new.jpg", date: "The Night", title: "The Night We Talked for Hours", desc: "Time just disappeared when I was talking to you." },
];

// 💌 Random romantic pop-up messages for the "tap the heart" surprise
const tapHeartMessages = [
  "I love you more than yesterday. ❤️",
  "You are my favorite notification. 💕",
  "You make my world brighter. ✨",
  "One month with you, and I'd choose you again. ❤️",
  "Here's to many more months together. 🥰",
  "Us until the end, bubby. 💖",
  "You're the best part of my every day. 💗",
  "You're the only one I want to grow old with. 💕",
  "hehe i lovee youuuuu bubb"
];

/* =========================================================
   END OF SETTINGS — the rest handles the site's behavior
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Fill in editable names
  document.getElementById("hero-eyebrow").textContent = `for ${girlfriendName}`;
  document.getElementById("letter-signature-name").textContent = yourName;
  document.getElementById("footer-your-name").textContent = yourName;
  document.getElementById("footer-her-name").textContent = girlfriendName;

  initParticleCanvas();
  initPasswordGate();
  initFloatingHearts();
  initNav();
  initMusicPlayer();
  initCountdown();
  renderTimeline();
  renderGallery();
  renderPolaroids();
  renderReasons();
  renderMemories();
  initLightbox();
  initEnvelope();
  initScrollReveal();
  initTapHeart();
  initSecretSurprise();
  initReplayButton();
});

/* =========================================================
   AMBIENT PARTICLE CANVAS (sparkles)
   ========================================================= */
function initParticleCanvas() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function makeParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.5 + 0.2,
      drift: (Math.random() - 0.5) * 0.3,
    };
  }

  const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 30000));
  for (let i = 0; i < count; i++) particles.push(makeParticle());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff6f9";
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#f8a9c4";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* =========================================================
   1. PASSWORD GATE
   ========================================================= */
function initPasswordGate() {
  const form = document.getElementById("password-form");
  const input = document.getElementById("password-input");
  const errorMsg = document.getElementById("error-message");
  const gate = document.getElementById("gate");
  const mainSite = document.getElementById("main-site");
  const successBurst = document.getElementById("success-burst");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();

    if (value === correctPassword) {
      unlockSite();
    } else {
      errorMsg.classList.add("visible");
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 450);
    }
  });

  function unlockSite() {
    // heart burst animation
    for (let i = 0; i < 18; i++) {
      const h = document.createElement("div");
      h.className = "burst-heart";
      h.textContent = "❤️";
      h.style.left = "50%";
      h.style.top = "55%";
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 160;
      h.style.setProperty("--bx", `${Math.cos(angle) * dist}px`);
      h.style.setProperty("--by", `${Math.sin(angle) * dist}px`);
      h.style.animationDelay = `${Math.random() * 0.15}s`;
      successBurst.appendChild(h);
    }

    setTimeout(() => {
      gate.classList.add("gate-hidden");
      mainSite.classList.add("visible");
      document.body.style.overflow = "auto";
      startMusic();
    }, 700);
  }
}

/* =========================================================
   FLOATING HEARTS (background ambience)
   ========================================================= */
function initFloatingHearts() {
  const layers = [
    document.getElementById("gate-hearts"),
    document.getElementById("global-hearts"),
    document.getElementById("hero-hearts"),
    document.getElementById("final-hearts"),
  ].filter(Boolean);

  layers.forEach((layer) => {
    spawnHeartsLoop(layer);
  });
}

function spawnHeartsLoop(container) {
  function spawn() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.innerHTML = Math.random() > 0.5 ? "❤" : "♡";
    const size = Math.random() * 14 + 12;
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}%`;
    const duration = Math.random() * 6 + 7;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1500);
  }

  // gentle, not distracting
  spawn();
  setInterval(spawn, 2200);
}

/* =========================================================
   NAVIGATION
   ========================================================= */
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });
}

/* =========================================================
   MUSIC PLAYER
   ========================================================= */
let musicStarted = false;

function initMusicPlayer() {
  const audio = document.getElementById("bg-music");
  const playBtn = document.getElementById("play-pause-btn");
  const muteBtn = document.getElementById("mute-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const player = document.getElementById("music-player");
  const vinyl = document.getElementById("vinyl");

  audio.volume = parseFloat(volumeSlider.value);

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = parseFloat(volumeSlider.value);
  });

  audio.addEventListener("play", () => {
    playBtn.textContent = "❚❚";
    vinyl.classList.add("spinning");
    player.classList.add("playing");
  });

  audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
    vinyl.classList.remove("spinning");
    player.classList.remove("playing");
  });
}

function startMusic() {
  const audio = document.getElementById("bg-music");
  if (musicStarted) return;
  musicStarted = true;
  audio.play().catch(() => {
    // Autoplay may still be blocked — that's fine, the user can press play.
  });
}

/* =========================================================
   4. COUNTDOWN
   ========================================================= */
function initCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");
  const timerWrap = document.getElementById("countdown-timer");
  const completeWrap = document.getElementById("countdown-complete");
  const timeLoving = document.getElementById("time-loving");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const now = new Date();
    const diff = monthsaryDate - now;

    if (diff <= 0) {
      timerWrap.classList.add("hidden");
      completeWrap.classList.remove("hidden");

      // Time spent loving you, since the monthsary date
      const elapsed = now - monthsaryDate;
      const d = Math.floor(elapsed / (1000 * 60 * 60 * 24));
      const h = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
      const m = Math.floor((elapsed / (1000 * 60)) % 60);
      timeLoving.textContent = `Time spent loving you: ${d} days, ${h} hours, ${m} minutes... and counting.`;
    } else {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      daysEl.textContent = pad(d);
      hoursEl.textContent = pad(h);
      minutesEl.textContent = pad(m);
      secondsEl.textContent = pad(s);
    }
  }

  tick();
  setInterval(tick, 1000);
}

/* =========================================================
   6. TIMELINE
   ========================================================= */
function renderTimeline() {
  const container = document.getElementById("timeline-container");
  container.innerHTML = timelineEvents
    .map(
      (ev) => `
      <div class="timeline-item reveal">
        <span class="timeline-dot"></span>
        <div class="timeline-card">
          <p class="timeline-date">📅 ${ev.date}</p>
          <h3 class="timeline-title">${ev.title}</h3>
          <p class="timeline-desc">${ev.desc}</p>
        </div>
      </div>`
    )
    .join("");
}

/* =========================================================
   7. GALLERY
   ========================================================= */
function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = galleryPhotos
    .map(
      (photo, i) => `
      <div class="gallery-item reveal" data-index="${i}">
        <img src="${photo.src}" alt="${photo.caption}" onerror="this.src='';this.style.background='linear-gradient(135deg,#ffd6e7,#f8a9c4)'" />
        <div class="gallery-overlay">
          <span class="gallery-caption">${photo.caption}</span>
          <span class="gallery-heart-icon">♡</span>
        </div>
      </div>`
    )
    .join("");
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  let currentIndex = 0;

  function open(index) {
    currentIndex = index;
    updateImage();
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  function updateImage() {
    const photo = galleryPhotos[currentIndex];
    img.src = photo.src;
    img.alt = photo.caption;
    caption.textContent = photo.caption;
  }

  function next() {
    currentIndex = (currentIndex + 1) % galleryPhotos.length;
    updateImage();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    updateImage();
  }

  // event delegation since gallery is rendered dynamically
  document.getElementById("gallery-grid").addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) open(parseInt(item.dataset.index, 10));
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}

/* =========================================================
   8. POLAROIDS
   ========================================================= */
function renderPolaroids() {
  const container = document.getElementById("polaroid-container");
  container.innerHTML = polaroidPhotos
    .map((p) => {
      const rotation = (Math.random() * 12 - 6).toFixed(1);
      return `
      <div class="polaroid reveal" style="transform: rotate(${rotation}deg);">
        <img src="${p.src}" alt="${p.caption}" onerror="this.style.background='linear-gradient(135deg,#ffd6e7,#f8a9c4)'" />
        <p class="polaroid-caption">"${p.caption}"</p>
      </div>`;
    })
    .join("");
}

/* =========================================================
   9. LOVE LETTER / ENVELOPE
   ========================================================= */
function initEnvelope() {
  const envelope = document.getElementById("envelope");
  const btn = document.getElementById("open-letter-btn");

  btn.addEventListener("click", () => {
    const isOpen = envelope.classList.toggle("open");
    btn.textContent = isOpen ? "Close Letter 💗" : "Open My Letter 💗";
  });
}

/* =========================================================
   10. REASONS WHY I LOVE YOU
   ========================================================= */
function renderReasons() {
  const grid = document.getElementById("reasons-grid");
  grid.innerHTML = reasons
    .map(
      (r) => `
      <div class="reason-card reveal">
        <div class="reason-icon">${r.icon}</div>
        <p class="reason-text">${r.text}</p>
      </div>`
    )
    .join("");
}

/* =========================================================
   11. FAVORITE MEMORIES
   ========================================================= */
function renderMemories() {
  const grid = document.getElementById("memories-grid");
  grid.innerHTML = favoriteMemories
    .map(
      (m) => `
      <div class="memory-card reveal">
        <img src="${m.img}" alt="${m.title}" onerror="this.style.background='linear-gradient(135deg,#ffd6e7,#f8a9c4)'" />
        <div class="memory-card-body">
          <p class="memory-date">${m.date}</p>
          <h3 class="memory-title">${m.title}</h3>
          <p class="memory-desc">${m.desc}</p>
        </div>
      </div>`
    )
    .join("");
}

/* =========================================================
   13. TAP THE HEART
   ========================================================= */
function initTapHeart() {
  const btn = document.getElementById("tap-heart-btn");
  const message = document.getElementById("tap-heart-message");

  btn.addEventListener("click", (e) => {
    btn.classList.remove("tapped");
    void btn.offsetWidth; // restart animation
    btn.classList.add("tapped");

    // random message
    const msg = tapHeartMessages[Math.floor(Math.random() * tapHeartMessages.length)];
    message.textContent = msg;
    message.classList.add("visible");

    // mini heart burst
    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const mini = document.createElement("span");
      mini.className = "mini-heart";
      mini.textContent = "❤";
      mini.style.left = `${rect.left + rect.width / 2}px`;
      mini.style.top = `${rect.top + rect.height / 2}px`;
      mini.style.position = "fixed";
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 90;
      mini.style.setProperty("--mx", `${Math.cos(angle) * dist}px`);
      mini.style.setProperty("--my", `${Math.sin(angle) * dist}px`);
      document.body.appendChild(mini);
      setTimeout(() => mini.remove(), 950);
    }
  });
}

/* =========================================================
   SECRET SURPRISE
   ========================================================= */
function initSecretSurprise() {
  const secretHeart = document.getElementById("secret-heart");
  const modal = document.getElementById("secret-modal");
  const closeBtn = document.getElementById("secret-close");
  let clickCount = 0;

  secretHeart.addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 5) {
      modal.classList.remove("hidden");
      clickCount = 0;
    }
  });

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

/* =========================================================
   SCROLL REVEAL (Intersection Observer)
   ========================================================= */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Observe existing + dynamically rendered .reveal elements
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

  const canvas = document.getElementById('cursor-trail');
  const ctx = canvas.getContext('2d');
  let trailParticles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    window.addEventListener('pointermove', (e) => {
      trailParticles.push({ x: e.clientX, y: e.clientY, life: 1, size: 4 + Math.random() * 3 });
      if (trailParticles.length > 40) trailParticles.shift();
    });

    function renderTrail() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailParticles.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 160, 191, ${p.life})`;
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        p.life -= 0.035;
      });
      trailParticles = trailParticles.filter(p => p.life > 0);
      requestAnimationFrame(renderTrail);
    }
    renderTrail();
  }


/* =========================================================
   15. REPLAY BUTTON
   ========================================================= */
function initReplayButton() {
  const btn = document.getElementById("replay-btn");
  btn.addEventListener("click", () => {
    document.getElementById("hero").scrollIntoView({ behavior: "smooth" });

    const audio = document.getElementById("bg-music");
    if (audio.paused) {
      audio.play().catch(() => {});
    }

    // reset reveal animations so they replay as the user scrolls back down
    document.querySelectorAll(".reveal.is-visible").forEach((el) => {
      el.classList.remove("is-visible");
    });
    initScrollReveal();
  });
}