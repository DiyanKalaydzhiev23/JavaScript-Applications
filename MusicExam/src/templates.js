import { html } from '../node_modules/lit-html/lit-html.js';

// Navigation, Home, Catalog and Footer Templates >>>>>>>>>>

const navGuestTemplate = () => html`
    <header>
        <nav>
            <img src="./images/headphones.png">
            <a href="/home">Home</a>
            <ul>
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/search">Search</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        </nav>
    </header>
    <main id="main-content"></main>
`;

const navUserTemplate = () => html`
    <header>
        <nav>
            <img src="./images/headphones.png">
            <a href="/home">Home</a>
            <ul>
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/search">Search</a></li>
                <li><a href="/create">Create Album</a></li>
                <li><a href="javascript:void(0)" id="logout">Logout</a></li>
            </ul>
        </nav>
    </header>
    <main id="main-content"></main>
`;


const homeTemplate = () => html`
    <section id="welcomePage">
        <div id="welcome-message">
            <h1>Welcome to</h1>
            <h1>My Music Application!</h1>
        </div>

        <div class="music-img">
            <img src="./images/musicIcons.webp">
        </div>
    </section>
    ${footerTemplate()}
`;

const catalogTemplate = (albums, userData) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${albums.length > 0 ? 
        albums.map(a => albumTemplate(a, userData)) : 
        html`<p>No Albums in Catalog!</p>`}

    </section>
    ${footerTemplate()}
`;

const albumTemplate = (album, userData) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${userData.id !== '' ? html`
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>` : ''}
        </div>
    </div>
`;

const footerTemplate = () => html`
    <footer>
        <div>
            &copy;SoftUni Team 2021. All rights reserved.
        </div>
    </footer>
`;

// <<<<<<<<<<>>>>>>>>>>>>

// Register and Login Templates >>>>>>>

const registerTemplate = () => html`
    <section id="registerPage">
        <form>
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
                
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
                
                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
                
                <button type="submit" class="register">Register</button>
                
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
    ${footerTemplate()}
`;

const loginTemplate = () => html`
    <section id="loginPage">
        <form>
            <fieldset>
                <legend>Login</legend>
                
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
                
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
                
                <button type="submit" class="login">Login</button>
                
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
    ${footerTemplate()}
`;

// <<<<<<<<<<<>>>>>>>>>>

// Create and edit Templates >>>>>>>>>>>>>

const createTemplate = () => html`
    <section class="createPage">
        <form>
            <fieldset>
                <legend>Add Album</legend>
                ${editCreateTemplate({name: ''})}
            </fieldset>
        </form>
    </section>
    ${footerTemplate()}
`;

const editTemplate = (album) => html`
    <section class="editPage">
        <form>
            <fieldset>
                <legend>Edit Album</legend>
                ${editCreateTemplate(album)}
            </fieldset>
        </form>
    </section>
    ${footerTemplate()}
`;

const editCreateTemplate = (album) => html`
    <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input id="name" name="name" class="name" type="text" placeholder="Album name" value=${album.name !== '' ? album.name :''}>
    
        <label for="imgUrl" class="vhide">Image Url</label>
        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url" value=${album.name !== '' ? album.imgUrl :''}>
    
        <label for="price" class="vhide">Price</label>
        <input id="price" name="price" class="price" type="text" placeholder="Price" value=${album.name !== '' ? album.price :''}>
    
        <label for="releaseDate" class="vhide">Release date</label>
        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date" value=${album.name !== '' ? album.releaseDate :''}>
    
        <label for="artist" class="vhide">Artist</label>
        <input id="artist" name="artist" class="artist" type="text" placeholder="Artist" value=${album.name !== '' ? album.artist :''}>
    
        <label for="genre" class="vhide">Genre</label>
        <input id="genre" name="genre" class="genre" type="text" placeholder="Genre" value=${album.name !== '' ? album.genre :''}>
    
        <label for="description" class="vhide">Description</label>
        <textarea name="description" id="description" class="description" placeholder="Description">${album.name !== '' ? album.description : ''}</textarea>
    
        <button class=${album.name !== '' ? 'edit-album' : 'add-album'} type="submit">Add New Album</button>
    </div>
`;

// <<<<<<>>>>>>

// Details Template >>>>>>>>

const detailsTemplate = (album, userData) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>

                ${userData.id === album._ownerId ? html`
                <div class="actionBtn">
                    <a href="/edit/${album._id}" class="edit">Edit</a>
                    <a href="javascript:void(0)" class="remove">Delete</a>
                </div>` : ''}
            </div>
        </div>
    </section>
    ${footerTemplate()}
`;

// <<<<<<>>>>>>

// Search Template >>>>>>>>

const searchTemplate = (albums, clicked, userData) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list">Search</button>
        </div>

        <h2>Results:</h2>

        ${albums.length > 0 ? html`
        <div class="search-result">
            ${albums.map(a => albumTemplate(a, userData))}
        </div>` : 
        clicked ? html`
        <p class="no-result">No result.</p>` : ''}

    </section>
    ${footerTemplate()}
`;
// <<<<<<>>>>>>

export {
    navGuestTemplate,
    navUserTemplate,
    registerTemplate,
    loginTemplate,
    homeTemplate,
    searchTemplate,
    createTemplate,
    catalogTemplate,
    detailsTemplate,
    editTemplate
};