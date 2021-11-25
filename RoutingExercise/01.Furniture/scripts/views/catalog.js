import { getFurniture } from '../requests.js';
import { dashboardTemplate } from '../templates.js';
import { myFurnitureTemplate } from '../templates.js';
import { displayNavigation } from '../app.js';

async function catalogPage(ctx) {
    displayNavigation();

    if (ctx.pathname === '/01.Furniture/my-furniture') {
        const furnitureData = await getFurniture(true);
        ctx.render(myFurnitureTemplate(furnitureData));
    } else {
        const furnitureData = await getFurniture();
        ctx.render(dashboardTemplate(furnitureData));   
    }
}

export {catalogPage};