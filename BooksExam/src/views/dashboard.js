import { dashboardTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from "../requests.js";

export async function dashboardPage() {
    const root = document.getElementById('site-content');
    const data = await getAll();
    
    render(dashboardTemplate(data), root);
}