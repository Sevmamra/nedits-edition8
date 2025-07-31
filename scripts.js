document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you, your message is sent (this is just a static demo).');
  this.reset();
});
