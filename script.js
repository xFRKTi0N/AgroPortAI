const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const year = document.querySelector('#year');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const leadForm = document.querySelector('#lead-form');
const formStatus = document.querySelector('#form-status');
const revealItems = document.querySelectorAll('.reveal');

year.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tabName = button.dataset.tab;

    tabButtons.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });

    tabPanels.forEach((panel) => panel.classList.remove('active'));

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    document.getElementById(tabName).classList.add('active');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

leadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(leadForm);
  const name = data.get('name').trim();
  const business = data.get('business').trim();
  const product = data.get('product').trim();
  const message = data.get('message').trim();

  if (!name || !business || !product) {
    formStatus.textContent = 'Please complete the required fields.';
    return;
  }

  const subject = encodeURIComponent(`AgroPort AI Inquiry from ${name}`);
  const body = encodeURIComponent(
`Hello AgroPort AI Team,

I am interested in the AgroPort AI pilot network.

Name: ${name}
Business type: ${business}
Product / service need: ${product}
Message: ${message || 'N/A'}

Thank you.`
  );

  formStatus.textContent = 'Opening your email app...';
  window.location.href = `mailto:momen@agroportai.com?subject=${subject}&body=${body}`;
});
