/*
Default project order
*/

export const PROJECT_ORDER = [
        "devagotchi",
	"virtual-desk-setup",
	"database-assignment",
	"react-fake-os",
	"niamhs-monster-cards",
	"tic-tac-toe-minimax-ai",
	"playwright-auto-checker",
	"block-craft",
	"django_project",
	"flaskinventoryapp",
	"class-based-rpg-python",
	"image-classifier-gui",
];

export function sortProjects(projects) {
	return [...projects].sort((a, b) => {

		// Find the position of a.id in FEATURED_PROJECT_ORDER

		// Find the position of b.id in FEATURED_PROJECT_ORDER

		// Return the difference between those positions
	});
}