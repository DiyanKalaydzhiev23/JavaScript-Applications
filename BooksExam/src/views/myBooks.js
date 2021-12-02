import { myBooksTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getMyData } from "../requests.js";

export async function myBooksPage() {
    const root = document.getElementById('site-content');
    const data = await getMyData();

    render(myBooksTemplate(data), root);
}