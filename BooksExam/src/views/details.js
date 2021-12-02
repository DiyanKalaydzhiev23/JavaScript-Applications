import { detailsTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getById, deleteRecord, like, getUserBookLike, getBookLikes } from "../requests.js";
 

export async function detailsPage(ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {id: ''};
    const id = ctx.pathname.split('/')[2];

    let liked = 1;
    if (userData.id !== '') {
        liked = await getUserBookLike(id, userData.id);
    }

    const bookLikes = await getBookLikes(id);
    const root = document.getElementById('site-content');
    const bookData = await getById(id);

    render(detailsTemplate(bookData, userData, liked, bookLikes), root);
    const likeBtn = document.getElementById('like');
    const deleteBtn = document.getElementById('delete');

    if (likeBtn) likeBtn.addEventListener('click', () => likeBook(id));
    if (deleteBtn) deleteBtn.addEventListener('click', () => deleteBook(id));
}

async function deleteBook(id) {
    const confirmation = confirm('Do you really want to delete it?');
    if (confirmation) await deleteRecord(id);
}

async function likeBook(id) {
    await like({bookId: id});
}
