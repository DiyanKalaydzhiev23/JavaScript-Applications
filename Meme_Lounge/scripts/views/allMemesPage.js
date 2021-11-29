import { allMemesTemplate } from '../templates.js';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../request.js';

export async function allMemePage() {
    const data = await getAll();
    const root = document.querySelector('main');
    
    render(allMemesTemplate(data), root);
}