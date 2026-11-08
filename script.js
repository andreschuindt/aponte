// A PONTE — Comportamentos de navegação da landing.
// Os botões das modalidades apontam diretamente para o Grupo INSPIRA no WhatsApp.
// A compra ainda não está habilitada neste site.

const header = document.getElementById('header');
const progress = document.getElementById('progress');
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  header?.classList.toggle('scrolled', window.scrollY > 28);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

toggle?.addEventListener('click', () => {
  const opened = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!opened));
  toggle.setAttribute('aria-label', opened ? 'Abrir menu' : 'Fechar menu');
  nav.classList.toggle('is-open', !opened);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Abrir menu');
}));

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();