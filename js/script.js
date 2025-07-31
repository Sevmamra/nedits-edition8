// AOS Init
AOS.init();

// Fancy heading line animation trigger
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fancy-heading').forEach(heading => {
    const top = heading.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      heading.classList.add('visible');
    }
  });
});

// Typewriter Effect (About Section)
document.addEventListener('DOMContentLoaded', function () {
  const about = document.getElementById('about-text');
  const full = about.textContent;
  about.textContent = '';
  let i = 0;
  function type() {
    if (i < full.length) {
      about.textContent += full.charAt(i++);
      setTimeout(type, 25);
    }
  }
  type();
});

// Hero Background Slideshow
(function () {
  const hero = document.querySelector('.hero');
  const imgs = [
    'images/hero-bg1.jpg',
    'images/hero-bg2.jpg',
    'images/hero-bg3.jpg',
    'images/hero-bg4.jpg',
    'images/hero-bg5.jpg',
    'images/hero-bg6.jpg'
  ];
  let pool = [...imgs];
  function nextBg() {
    if (pool.length === 0) pool = [...imgs];
    const idx = Math.floor(Math.random() * pool.length);
    const sel = pool.splice(idx, 1)[0];
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${sel}')`;
  }
  nextBg();
  setInterval(nextBg, 3000);
})();

// Services Section: Dynamic Load + Carousel
(async function () {
  const container = document.getElementById('services-carousel');
  const response = await fetch('services.json');
  const data = await response.json();

  // Generate HTML for cards
  data.forEach((service, i) => {
    const card = document.createElement('div');
    card.classList.add('service-card');
    card.innerHTML = `
      <img src="${service.icon}" class="service-icon" alt="${service.title}"/>
      <h3>${service.title}</h3>
      <p>${service.desc}</p>
    `;
    container.appendChild(card);
  });

  const cards = container.querySelectorAll('.service-card');
  let active = 1;
  let interval;

  function layout() {
    cards.forEach((card, i) => {
      card.classList.remove('left', 'right', 'active');
      if (i === active) {
        card.classList.add('active');
      } else if (i === (active - 1 + cards.length) % cards.length) {
        card.classList.add('left');
      } else if (i === (active + 1) % cards.length) {
        card.classList.add('right');
      } else {
        card.style.opacity = '0';
      }
    });
  }

  layout();

  function nextSlide() {
    active = (active + 1) % cards.length;
    layout();
  }

  interval = setInterval(nextSlide, 3000);

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      clearInterval(interval); // Stop auto slide
      active = i;
      layout();

      // Glow logic
      cards.forEach(c => c.classList.remove('glow'));
      card.classList.add('glow');
    });
  });
})();

// Testimonials animation (same as before)
(function () {
  const tests = document.querySelectorAll('.testimonial');

  window.addEventListener('scroll', () => {
    tests.forEach((t, i) => {
      if (t.getBoundingClientRect().top < window.innerHeight - 50 && !t.classList.contains('shown')) {
        t.classList.add('shown');
        t.style.transform = (i % 2 === 0) ? 'translateX(-100px)' : 'translateX(100px)';
        setTimeout(() => {
          t.style.transition = 'all 0.6s';
          t.style.transform = 'translateX(0)';
          t.style.opacity = '1';
        }, 50);
      }
    });
  });
})();
