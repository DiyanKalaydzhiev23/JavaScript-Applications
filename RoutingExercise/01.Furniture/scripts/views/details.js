import { detailsTemplate } from '../templates.js';
import { getFurnitureById, deleteFurniture } from '../requests.js';


async function detailsPage(ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const data = await getFurnitureById(ctx.path.split('/')[3]);
    let display = 'none';

    try {
        if (data[0]._ownerId === userData.id) {
            display = 'inline';
        }
    } catch (e) {
        console.log(e);
    }

    ctx.render(detailsTemplate(data[0], display));
    addListeners(data[0]._id);
}


function addListeners(id) {
    document.getElementById('deleteBtn').addEventListener('click', () => {
        const result = confirm('Do you want to delete this item?');
        if (result) deleteFurniture(id); 
    });
}

export {detailsPage};