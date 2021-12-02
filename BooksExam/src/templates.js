import { html } from '../node_modules/lit-html/lit-html.js';


const navGuestTemplate = () => html`
    <header id="site-header">
        <nav class="navbar">
            <section class="navbar-dashboard">
                <a href="/home">Dashboard</a>
                <div id="guest">
                    <a class="button" href="/login">Login</a>
                    <a class="button" href="/register">Register</a>
                </div>
            </section>
        </nav>
    </header>
    <main id="site-content"></main>
`;

const navUserTemplate = () => html`
    <header id="site-header">
        <nav class="navbar">
            <section class="navbar-dashboard">
                <a href="/home">Dashboard</a>
                <div id="user">
                    <span>Welcome, {email}</span>
                    <a class="button" href="/myBooks">My Books</a>
                    <a class="button" href="/create">Add Book</a>
                    <a class="button" href="javascript:void(0)">Logout</a>
                </div>
            </section>
        </nav>
    </header>
    <main id="site-content"></main>
`;

const registerTemplate = () => html`
    <section id="register-page" class="register">
        <form id="register-form" action="" method="">
            <fieldset>
                <legend>Register Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                        <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>
    ${footerTemplate()}
`;

const loginTemplate = () => html`
    <section id="login-page" class="login">
        <form id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>
    ${footerTemplate()}
`;

const dashboardTemplate = (data) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        ${data.length > 0 ? html`
        <ul class="other-books-list">
        ${data.map(b => bookTemplate(b))}
        </ul>` : html`<p class="no-books">No books in database!</p>`}        
    </section>
    ${footerTemplate()}
`;

const myBooksTemplate = (data) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        ${data.length > 0 ? html`
        <ul class="my-books-list">
        ${data.map(b => bookTemplate(b))}
        </ul>` : html`<p class="no-books">No books in database!</p>`}        
    </section>
    ${footerTemplate()}
`;

const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`;

const addBookTemplate = () => html`
    <section id="create-page" class="create">
        <form id="create-form" action="" method="">
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>
    ${footerTemplate()}
`;

const footerTemplate = () => html`
    <footer id="site-footer">
        <p>@OnlineBooksLibrary</p>
    </footer>
`;

const detailsTemplate = (bookData, userData, liked, bookLikes) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${bookData.title}</h3>
            <p class="type">Type: ${bookData.type}</p>
            <p class="img"><img src=${bookData.imageUrl}></p>
            <div class="actions">
                ${userData.id === bookData._ownerId ? html`
                <a class="button" href="/edit/${bookData._id}">Edit</a>
                <a class="button" id="delete" href="/home">Delete</a>`
                : userData.id !== '' && liked === 0 ? html`
                <a class="button" id="like"  href="/details/${bookData._id}">Like</a>`: ''}
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${bookLikes}</span>
                </div>
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${bookData.description}</p>
        </div>
    </section>
`;

const editTemplate = (bookData) => html`
    <section id="edit-page" class="edit">
        <form id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value=${bookData.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description"
                            id="description">${bookData.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value=${bookData.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value=${bookData.type}>
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`;

export {
    navUserTemplate,
    navGuestTemplate,
    registerTemplate,
    loginTemplate,
    dashboardTemplate,
    myBooksTemplate,
    addBookTemplate,
    detailsTemplate,
    editTemplate
};