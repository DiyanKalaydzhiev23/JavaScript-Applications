import { html } from '../node_modules/lit-html/lit-html.js';


const navGuestTemplate = () => html`
    <nav>
        <a class="active" href="/">Home Page</a>
        <a href="/allMemes">All Memes</a>
        <div class="guest">
            <div class="profile">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </div>
    </nav>
    <main></main>
`;

const registerTemplate = () => html`
    <section id="register">
        <form id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;

const loginTemplate = () => html`
    <section id="login">
        <form id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;

const createTemplate = () => html`
    <section id="create-meme">
        <form id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;

const navUserTemplate = (userData) => html`
    <nav>
        <a href="/allMemes">All Memes</a>
        <div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
                <span>Welcome, ${userData.email}</span>
                <a href="/myProfile">My Profile</a>
                <a href="javascript:void(0)">Logout</a>
            </div>
        </div>
    </nav>
    <main></main>
`;

const detailsTemplate = (meme, owner) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                ${owner ? html`
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button class="button danger">Delete</button>
                ` : ''}
            </div>
        </div>
    </section>
`;

const editTemplate = (meme) => html`
    <section id="edit-meme">
        <form id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                ${meme.description}
                </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
       </form>
    </section>
`;

const welcomeTemplate = () => html`
    <section id="welcome">
        <div id="welcome-container">
            <h1>Welcome To Meme Lounge</h1>
            <img src="/images/welcome-meme.jpg" alt="meme">
            <h2>Login to see our memes right away!</h2>
            <div id="button-div">
                <a href="/login" class="button">Login</a>
                <a href="/register" class="button">Register</a>
            </div>
        </div>
    </section>
    <footer class="footer">
        <p>Created by SoftUni Delivery Team</p>
    </footer>
`;

const memeTemplate = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${meme._id}">Details</a>
            </div>
        </div>
    </div>
`;

const noMemesTemplate = () => html`
    <div id="memes">
		<p class="no-memes">No memes in database.</p>
	</div>
`;

const allMemesTemplate = (data) => html`
    <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                ${data ? data.map(d => memeTemplate(d)) : noMemesTemplate()}
            </div>
    </section>
`;

const myProfileTemplate = (userData, memeData) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
            <div class="user-content">
                <p>Username: ${userData.username}</p>
                <p>Email: ${userData.email}</p>
                <p>My memes count: ${memeData.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memeData.length > 0 ? memeData.map(m => html`
                <div class="user-meme">
                    <p class="user-meme-title">${m.title}</p>
                    <img class="userProfileImage" alt="meme-img" src=${m.imageUrl}>
                    <a class="button" href="/details/${m._id}">Details</a>
                </div>
            `) : html`<p class="no-memes">No memes in database.</p>`}
        </div>
</section>
`;

export {
    navGuestTemplate,
    navUserTemplate,
    welcomeTemplate,
    registerTemplate,
    loginTemplate,
    allMemesTemplate,
    createTemplate,
    myProfileTemplate,
    detailsTemplate,
    editTemplate
};