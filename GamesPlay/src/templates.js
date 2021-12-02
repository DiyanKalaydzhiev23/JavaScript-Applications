import { html } from '../node_modules/lit-html/lit-html.js';

const navGuestTemplate = () => html`
    <header>
        <h1><a class="home" href="/home">GamesPlay</a></h1>
        <nav>
            <a href="/allGames">All games</a>
            <div id="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </nav>
    </header>
    <main id="main-content"></main>
`;

const navUserTemplate = () => html`
    <header>
        <h1><a class="home" href="/home">GamesPlay</a></h1>
        <nav>
            <a href="/allGames">All games</a>
            <div id="user">
                <a href="/create">Create Game</a>
                <a href="javascript:void(0)">Logout</a>
            </div>
        </nav>
    </header>
    <main id="main-content"></main>
`;

const registerTemplate = () => html`
    <section id="register-page" class="content auth">
        <form id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;

const loginTemplate = () => html`
    <section id="login-page" class="auth">
        <form id="login">

            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;

const homeTemplate = (games) => html`
    <section id="welcome-world">

        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">

        <div id="home-page">
            <h1>Latest Games</h1>
            ${games.length > 0 ? games.map(g => homeGameTemplate(g))
            : html`<p class="no-articles">No games yet</p>`}
        </div>
    </section>
`;

const homeGameTemplate = (game) => html`
    <div class="game">
        <div class="image-wrap">
            <img src=${game.imageUrl}>
        </div>
        <h3>${game.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${game._id}" class="btn details-btn">Details</a>
        </div>
    </div>
`;


const allGamesGameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>
    </div>
`;


const allGamesTemplate = (games) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        ${games.length > 0 ? games.map(g => allGamesGameTemplate(g))
        : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
`;

const createTemplate = () => html`
    <section id="create-page" class="auth">
        <form id="create">
            <div class="container">

                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
`;

const detailsTemplate = (game, comments, userData) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>

            <p class="text">${game.summary}</p>

            <div class="details-comments">
                <h2>Comments:</h2>
                ${comments.length > 0 ? html`
                <ul>
                    ${comments.map(c => commentTemplate(c))}
                </ul>`
                : html`<p class="no-comment">No comments.</p>`}
            </div>

            ${userData.id === game._ownerId ? html`
            <div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a href="javascript:void(0)" id="delete" class="button">Delete</a>
            </div>`: ''}
        </div>
        
        ${userData.id !== game._ownerId && userData.id !== '' ? 
        html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`: ''}
        
    </section>
`;

const commentTemplate = (commentData) => html`
    <li class="comment">
        <p>${commentData.comment}.</p>
    </li>
`;


export {
    navGuestTemplate,
    navUserTemplate,
    registerTemplate,
    loginTemplate,
    homeTemplate,
    allGamesTemplate,
    createTemplate,
    detailsTemplate
};