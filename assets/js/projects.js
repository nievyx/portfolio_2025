let projects = [];

// Load projects from JSON
async function loadProjects() {
    // main.js is in /assets/js, so JSON is one level up in /assets/data
    const res = await fetch("assets/data/projects.json");
    if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
    return await res.json();
}

function mountMediaInto(container, projectName, titleText = "Project demo") {
    const base = `assets/imgs/${projectName}`;
    const candidates = [
        {type: "video", src: `${base}/demo.mp4`},
        {type: "img", src: `${base}/demo.gif`},
        {type: "img", src: `${base}/demo.png`},
    ];

    let idx = 0;

    function next() {
        if (idx >= candidates.length) return;

        const item = candidates[idx++];
        let el;

        if (item.type === "video") {
            el = document.createElement("video");
            el.src = item.src;
            el.autoplay = true;
            el.loop = true;
            el.muted = true;
            el.playsInline = true;
            el.controls = true; // optional for modal
        } else {
            el = document.createElement("img");
            el.src = item.src;
            el.alt = titleText;
            el.style.width = "100%";
            el.style.marginTop = "12px";
            el.style.borderRadius = "10px";
        }

        el.onerror = () => {
            el.remove();
            next();
        };

        container.appendChild(el);
    }

    next();
}

function projectCard(p) {
    const grid = document.createElement('article');
    grid.className = 'card';





// build media (demo.mp4 -> demo.gif -> demo.png)
    const media = document.createElement('div');
    media.className = 'card-media';

    const base = `assets/imgs/${p.name}`;
    const candidates = [
        { type: "video", src: `${base}/demo.mp4` },
        { type: "img",   src: `${base}/demo.gif` },
        { type: "img",   src: `${base}/demo.png` },
    ];

    let idx = 0;

    function mountNext() {
        if (idx >= candidates.length) return;

        const item = candidates[idx++];
        let el;

        if (item.type === "video") {
            el = document.createElement("video");
            el.src = item.src;
            el.autoplay = true;
            el.loop = true;
            el.muted = true;
            el.playsInline = true;
            el.preload = "metadata"; // lighter than auto
        } else {
            el = document.createElement("img");
            el.src = item.src;
            el.alt = `${p.title} demo`;
            el.loading = "lazy";
        }

        el.onerror = () => {
            el.remove();
            mountNext();
        };

        media.appendChild(el);
    }

    mountNext();



    grid.innerHTML = `
        <div class="card-body">
          <h3>${p.title}</h3>
          <p class="desc">${p.desc}</p>
          <div class="stack">
            ${p.stack.map(s=>`<span class="tag">${s}</span>`).join('')}
          </div>
          <div class="card-actions">
            ${p.links.repo ? `
              <a class="btn ghost" href="${p.links.repo}" target="_blank" rel="noopener">
                <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58l-.01-2.04c-3.34.73-4.04-1.61-4.04-1.61-.54-1.39-1.31-1.76-1.31-1.76-1.07-.73.08-.72.08-.72 1.19.08 1.82 1.23 1.82 1.23 1.05 1.8 2.75 1.28 3.42.98.11-.76.41-1.28.75-1.57-2.66-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.24-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.85 1.23 1.92 1.23 3.24 0 4.64-2.81 5.67-5.49 5.97.42.36.8 1.08.8 2.18l-.01 3.23c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z"/>
                </svg>
                Code
              </a>
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

