document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');
  const actions = document.querySelector('.actions');
  if (!nav || !toggle) return;

  const setExpanded = (open) => toggle.setAttribute('aria-expanded', String(open));
  const openNav = () => { nav.classList.add('open'); setExpanded(true); };
  const closeNav = () => { nav.classList.remove('open'); setExpanded(false); };
  const toggleNav = () => nav.classList.toggle('open') ? setExpanded(true) : setExpanded(false);

  toggle.addEventListener('click', toggleNav);

  // Close when clicking a link in mobile mode
  [links, actions].forEach(el => el && el.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeNav();
  }));

  // Close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
});