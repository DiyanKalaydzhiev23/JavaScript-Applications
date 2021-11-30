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

const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`;

const footerTemplate = () => html`
    <footer id="site-footer">
        <p>@OnlineBooksLibrary</p>
    </footer>
`;

export {
    navUserTemplate,
    navGuestTemplate,
    registerTemplate,
    loginTemplate,
    dashboardTemplate
};