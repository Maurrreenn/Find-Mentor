// app.js
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const mobileMenu = document.getElementById('mobileMenu');
const trackSelect = document.getElementById('trackSelect');
const searchInput = document.getElementById('searchInput');
const expertiseFilter = document.getElementById('expertiseFilter');
const availabilityFilter = document.getElementById('availabilityFilter');
const mentorsList = document.getElementById('mentorsList');
const template = document.getElementById('mentorTemplate');

let currentMentors = [];

// Toggle menu
hamburger.addEventListener('click', e => {
  e.stopPropagation();
  const isDesktop = window.innerWidth >= 768;
  if (isDesktop) {
    sidebar.classList.toggle('open');
    mobileMenu.classList.remove('open');
  } else {
    mobileMenu.classList.toggle('open');
    sidebar.classList.remove('open');
  }
  hamburger.classList.toggle('open', sidebar.classList.contains('open') || mobileMenu.classList.contains('open'));
});

// Close on outside click
document.addEventListener('click', () => {
  sidebar.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
});
sidebar.addEventListener('click', e => e.stopPropagation());
mobileMenu.addEventListener('click', e => e.stopPropagation());

// Populate track dropdown
TRACK_LIST.forEach(t => {
  const opt = document.createElement('option');
  opt.value = t.id;
  opt.textContent = t.name;
  trackSelect.appendChild(opt);
});

// Populate expertise filter
const allExpertise = [...new Set(Object.values(TRACKS).flat().map(m => m.expertise))];
allExpertise.forEach(exp => {
  const opt = document.createElement('option');
  opt.value = exp;
  opt.textContent = exp.charAt(0).toUpperCase() + exp.slice(1);
  expertiseFilter.appendChild(opt);
});

// Load track
function loadTrack(id) {
  currentMentors = id ? TRACKS[id] : Object.values(TRACKS).flat();
  filterAndRender();
}

// Filter & render
function filterAndRender() {
  const q = searchInput.value.toLowerCase();
  const exp = expertiseFilter.value;
  const avail = availabilityFilter.value;

  const filtered = currentMentors.filter(m => {
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.bio.toLowerCase().includes(q);
    const matchExp = !exp || m.expertise === exp;
    const matchAvail = !avail || m.availability === avail;
    return matchQ && matchExp && matchAvail;
  });

  renderMentors(filtered);
}

// Render using template (WhatsApp link is in HTML)
function renderMentors(list) {
  mentorsList.innerHTML = '';
  if (!list.length) {
    mentorsList.innerHTML = `<p class="no-mentors">No mentors found.</p>`;
    return;
  }

  list.forEach(m => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.mentor-name').textContent = m.name;
    clone.querySelector('.expertise').textContent = m.expertise;
    clone.querySelector('.bio').textContent = m.bio;
    const availEl = clone.querySelector('.availability');
    availEl.textContent = m.availability === 'available' ? 'Available' : 'Busy';
    availEl.style.color = m.availability === 'available' ? 'green' : 'red';

    // No JS for WhatsApp link — it's in HTML
    mentorsList.appendChild(clone);
  });
}

// Events
trackSelect.addEventListener('change', e => loadTrack(e.target.value));
searchInput.addEventListener('input', filterAndRender);
expertiseFilter.addEventListener('change', filterAndRender);
availabilityFilter.addEventListener('change', filterAndRender);

// Init
loadTrack('');