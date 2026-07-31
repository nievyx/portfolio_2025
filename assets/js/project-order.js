/*
Default project order
*/

export const FEATURED_PROJECT_ORDER= [
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
	
	const orderforIndexVals = FEATURED_PROJECT_ORDER.slice(0).reverse();
	

	return [...projects].sort((a, b) => {

		// Find the position of a.id in FEATURED_PROJECT_ORDER
		const aIndex = -orderforIndexVals.indexOf(a.id);
		
		// Find the position of b.id in FEATURED_PROJECT_ORDER
		const bIndex = -orderforIndexVals.indexOf(b.id);
		
		// Return the difference between those positions
		return aIndex - bIndex;
	});
}