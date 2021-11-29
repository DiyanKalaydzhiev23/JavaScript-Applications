import { myProfileTemplate } from '../templates.js';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getMyMemes } from '../request.js';

export async function myProfilePage() {
    const root = document.querySelector('main');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const data = await getMyMemes(userData);
    
    render(myProfileTemplate(userData, data), root);
}