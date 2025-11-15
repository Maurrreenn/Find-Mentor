// app.js
// TechHerPath | Find Your Mentor
// @amechi54322 — Nigeria, 10:39 PM WAT, Nov 15, 2025

document.addEventListener("DOMContentLoaded", () => {
  console.log("app.js loaded — DOM ready");

  // DOM ELEMENTS
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const mobileMenu = document.getElementById('mobileMenu');
  const trackSelect = document.getElementById('trackSelect');
  const searchInput = document.getElementById('searchInput');
  const expertiseFilter = document.getElementById('expertiseFilter');
  const mentorsList = document.getElementById('mentorsList');
  const template = document.getElementById('mentorTemplate');

  let currentMentors = [];

  // TODAY'S DAY (for green highlight)
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const TODAY = DAYS[new Date().getDay()]; // Today: Sat
  console.log("Today is:", TODAY);

  // ——— CRITICAL CHECKS ———
  if (!window.TRACKS || !window.TRACK_LIST) {
    console.error("tracks.js failed to load! Check file path and syntax.");
    trackSelect.innerHTML = "<option>tracks.js error</option>";
    return;
  }

  if (!template || !template.content) {
    console.error("mentorTemplate not found or invalid! Check HTML.");
    mentorsList.innerHTML = "<p>Error: Card template missing</p>";
    return;
  }

  if (!mentorsList) {
    console.error("mentorsList container not found!");
    return;
  }

  console.log("All systems ready. TRACKS:", Object.keys(window.TRACKS).length);

  // ——— POPULATE TRACK DROPDOWN ———
  const allTracksOption = document.createElement('option');
  allTracksOption.value = "";
  allTracksOption.textContent = "All Tracks";
  trackSelect.appendChild(allTracksOption);

  window.TRACK_LIST.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name;
    trackSelect.appendChild(opt);
  });

  // ——— POPULATE EXPERTISE FILTER ———
  const allExpertise = [...new Set(Object.values(window.TRACKS).flat().map(m => m.expertise))];
  allExpertise.forEach(exp => {
    const opt = document.createElement('option');
    opt.value = exp;
    opt.textContent = exp.charAt(0).toUpperCase() + exp.slice(1);
    expertiseFilter.appendChild(opt);
  });

  // ——— LOAD MENTORS BY TRACK ———
  function loadTrack(id) {
    currentMentors = id ? window.TRACKS[id] : Object.values(window.TRACKS).flat();
    console.log("Loaded track:", id || "All", "→", currentMentors.length, "mentors");
    filterAndRender();
  }

  // ——— FILTER BY SEARCH + EXPERTISE ———
  function filterAndRender() {
    const query = searchInput.value.toLowerCase().trim();
    const exp = expertiseFilter.value;

    const filtered = currentMentors.filter(m => {
      const matchesSearch = !query ||
        m.name.toLowerCase().includes(query) ||
        m.bio.toLowerCase().includes(query);
      const matchesExp = !exp || m.expertise === exp;
      return matchesSearch && matchesExp;
    });

    console.log("Filtered to:", filtered.length, "mentors");
    renderMentors(filtered);
  }

  // ——— RENDER MENTOR CARDS ———
  function renderMentors(list) {
    mentorsList.innerHTML = ''; // Clear
    console.log("renderMentors called with", list.length, "items");

    if (!list.length) {
      mentorsList.innerHTML = `<p class="no-mentors">No mentors found.</p>`;
      return;
    }

    list.forEach((mentor, index) => {
      console.log(`Rendering #${index}:`, mentor.name);

      // Clone template
      const clone = template.content.cloneNode(true);

      // Select elements (with safety)
      const nameEl = clone.querySelector('.mentor-name');
      const imgEl = clone.querySelector('.mentor-img');
      const expEl = clone.querySelector('.expertise');
      const bioEl = clone.querySelector('.bio');
      const availEl = clone.querySelector('.availability');

      if (!nameEl || !imgEl || !expEl || !bioEl || !availEl) {
        console.error("Template missing required class!", { nameEl, imgEl, expEl, bioEl, availEl });
        return;
      }

      // Fill data
      nameEl.textContent = mentor.name;
      expEl.textContent = mentor.expertise;
      bioEl.textContent = mentor.bio;

      // Image with fallback
      imgEl.src = mentor.image || `https://via.placeholder.com/60?text=${mentor.name[0]}`;
      imgEl.alt = `${mentor.name} - Mentor`;

      // Workdays with today highlighted
      const dayHTML = mentor.workdays.map(day => {
        const isToday = day === TODAY;
        return `<span style="font-weight:600;${isToday ? 'color:#00c853;font-weight:700;' : ''}">${day}</span>`;
      }).join(', ');
      availEl.innerHTML = `Works: ${dayHTML}`;

      // Append card
      mentorsList.appendChild(clone);
    });
  }

  // ——— EVENT LISTENERS ———
  trackSelect.addEventListener('change', (e) => {
    console.log("Track changed to:", e.target.value);
    loadTrack(e.target.value);
  });

  searchInput.addEventListener('input', () => {
    setTimeout(filterAndRender, 100); // Debounce
  });

  expertiseFilter.addEventListener('change', () => {
    console.log("Expertise filter:", expertiseFilter.value);
    filterAndRender();
  });

  // ——— HAMBURGER MENU (Mobile) ———
  if (hamburger && sidebar && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
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

    document.addEventListener('click', () => {
      sidebar.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });

    sidebar.addEventListener('click', e => e.stopPropagation());
    mobileMenu.addEventListener('click', e => e.stopPropagation());
  }

  // ——— INITIALIZE ———
  console.log("Initializing with all mentors...");
  loadTrack('');
});