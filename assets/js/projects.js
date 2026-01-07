import { mountMediaInto } from "./media.js";

let projects = [];

// Load projects from JSON
async function loadProjects() {
    // main.js is in /assets/js, so JSON is one level up in /assets/data
    const res = await fetch("assets/data/projects.json");
    if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
    return await res.json();
}


function projectCard(p) {
    const grid = document.createElement('article');
    grid.className = 'card';

    const media = document.createElement('div');
    media.className = 'card-media';
    mountMediaInto(media, p.name, `${p.title} demo`);

    grid.innerHTML = `
  <div class="card-body">
    <h3>${p.title}</h3>
    <p class="desc">${p.desc}</p>
    <div class="stack">
      ${p.stack.map(s=>`<span class="tag">${s}</span>`).join('')}
    </div>
    <div class="card-actions">
      ${p.links.repo ? `
        <a class="btn ghost" href="${p.links.repo}" target="_blank" rel="noopener">Code</a>
      `: ''}
      ${p.links.demo ? `
        <a class="btn primary" href="${p.links.demo}" target="_blank" rel="noopener">Live Demo</a>
      `: ''}
      <button class="btn primary more-info-btn" type="button" data-project="${p.name}">
        More Info
      </button>
    </div>
  </div>
`;

    grid.appendChild(media);
    return grid;
}

// Build the HTML that goes inside the popup modal for a project
function buildProjectModalContent(p) {
    // fall back to desc if longDesc is missing
    const mainText = p.longDesc || p.desc || "";

    const highlightsSection = p.highlights && p.highlights.length
        ? `
      <h3>Key Features</h3>
      <ul>
        ${p.highlights.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `
        : "";

    const learningSection = p.learning && p.learning.length
        ? `
      <h3>What I Learned</h3>
      <ul>
        ${p.learning.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `
        : "";

    const stackSection = p.stack && p.stack.length
        ? `
      <h3>Tech Stack</h3>
      <ul>
        ${p.stack.map(s => `<li>${s}</li>`).join('')}
      </ul>
    `
        : "";

    const linksSection = p.links && (p.links.repo || p.links.demo)
        ? `
      <h3>Links</h3>
      <ul>
        ${p.links.repo ? `<li><a href="${p.links.repo}" target="_blank" rel="noopener">Source code on GitHub</a></li>` : ""}
        ${p.links.demo ? `<li><a href="${p.links.demo}" target="_blank" rel="noopener">Live demo</a></li>` : ""}
      </ul>
    `
        : "";

    return `
      <h2>${p.title}</h2>
      <p>${mainText}</p>
    
      ${highlightsSection}
      ${learningSection}
      ${stackSection}
      ${linksSection}
    
      <div class="modal-media" data-project="${p.name}"></div>

    
  `;
}


// ===== Modal logic =====
function openModal(html) {

    document.getElementById("modal-inner").innerHTML = html;
    document.getElementById("modal").classList.add("show");
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
}

// TODO: temp
window.closeModal = closeModal;

// Delegate clicks on "More Info" buttons
document.addEventListener('click', (event) => {
    const btn = event.target.closest('.more-info-btn');
    if (!btn) return;

    const name = btn.dataset.project;
    const p = projects.find(pr => pr.name === name);
    if (!p) return;

    const html = buildProjectModalContent(p);
    openModal(html);
    const mediaSlot = document.querySelector("#modal-inner .modal-media");
    if (mediaSlot) mountMediaInto(mediaSlot, p.name, `${p.title} detailed demo`);

});

export async function initProjects() {
    try {
        projects = await loadProjects();

        const projectsGrid = document.getElementById("projectsGrid");
        if (!projectsGrid) return;

        projectsGrid.append(
            ...projects
                .filter(p => p.visibility && p.visibility.portfolio === true)
                .map(projectCard)
        );
    } catch (err) {
        console.error(err);
    }
}

