// New Refactored Approach
import { initIntro } from "./intro.js";
import { initProjects } from "./projects.js";


// ====== Editable profile links ======
const LINKS = {
  github: "https://github.com/nievyx/",
  cv: "/"
};

//     // Render
// document.addEventListener("DOMContentLoaded", async () => {
//     // Always show intro
//     // typeInto(document.getElementById("terminalText"), introLines, 18);
//
//     // Load + render projects
//     try {
//         projects = await loadProjects();
//
//         const projectsGrid = document.getElementById("projectsGrid");
//         projectsGrid.append(...projects
//             .filter(p => p.visibility && p.visibility.portfolio === true)
//             .map(projectCard)
//         );
//     } catch (err) {
//         console.error(err);
//     }


    // Years & links
function initFooterAndLinks() {
    const y = new Date().getFullYear();

    document.getElementById("year").textContent = y;
    document.getElementById("footerYear").textContent = y;

    document.getElementById("githubLink").href = LINKS.github;

    document.getElementById("cvBtn").href = LINKS.cv;
};

// Boot Order
initIntro();
initProjects();
initFooterAndLinks();
