import page from '../node_modules/page/page.mjs';
import { selectView } from './app.js';


const endpoints = {
    getAll: () => { return 'http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category' },
    register: () => { return 'http://localhost:3030/users/register' },
    login: () => { return 'http://localhost:3030/users/login' },
    create: () => { return 'http://localhost:3030/data/games' },
    myData: () => { 
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        return `http://localhost:3030/data/books?where=_ownerId%3D%22${userData.id}%22&sortBy=_createdOn%20desc`
    },
    getById: (id) => { return `http://localhost:3030/data/games/${id}`},
    commentsForGame: (gameId) => { return `http://localhost:3030/data/comments?where=gameId%3D%22${gameId}%22`},
    createComment: () => { return 'http://localhost:3030/data/comments' }
}

const options = {
    postLogReg: (data) => { return {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    },
    post: (data, userData) => { return {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        };
    },
    put: (data, userData) => { return {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        };
    },
    delete: (userData) =>  { return {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: '{}'
        };
    }
}


async function logout() {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const url = 'http://localhost:3030/users/logout';
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        }
    });
    
    if (response.status !== 204) {
        alert(`Error: ${response.status}`);
        return;
    }

    sessionStorage.clear();
    selectView();
}

async function getProceed(url) {
    const response = await fetch(url);

    if (response.status === 200) {
        return await response.json();
    }

    alert(`Error: ${response.status}`);
}

async function getAll() {
    const url = endpoints.getAll();
    return await getProceed(url);
}

async function getById(id) {
    const url = endpoints.getById(id);
    return await getProceed(url);
}

async function register(email, password) {
    const url = endpoints.register();
    const data = {
        email,
        password,
    };

    try {
        const response = await fetch(url, options.postLogReg(data));
        const responseData = await response.json();

        if (response.status == 200) {
            sessionStorage.setItem('authToken', responseData.accessToken);
            page.redirect('/home');
        } else {
            throw new Error(response.status);
        }
    } catch (e) {
        alert(e.message);
    }
}

async function login(email, password) {
    const url = endpoints.login();
    const data = {
        email,
        password
    };

    try {
        const response = await fetch(url, options.postLogReg(data));

        if (response.status == 200) {
            sessionStorage.setItem('authToken', response.accessToken);
        } else {
            throw new Error('User doesn\'t exist');
        }

        const responseData = await response.json();
        const userData = {
            email: responseData.email,
            id: responseData._id,
            token: responseData.accessToken
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        selectView();
    } catch (e) {
        alert(e.message);
    }
}


async function update(id, data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.getById(id);
    const response = await fetch(url, options.put(data, userData));

    if (response.status == 200) {
        page.redirect('/home');
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function deleteRecord(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.getById(id);
    const response = await fetch(url, options.delete(userData));

    if (response.status == 200) {
        page.redirect('/home');
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function getCommentForGame(gameId) {
    const url = endpoints.commentsForGame(gameId);
    return await getProceed(url);
}

async function createComment(data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.createComment();
    const response = await fetch(url, options.post(data, userData));

    if (response.status == 200) {
        page.redirect(`/details/${data.gameId}`);
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function create(data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.create();
    const response = await fetch(url, options.post(data, userData));

    if (response.status == 200) {
        page.redirect('/home');
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function getMyData() {
    const url = endpoints.myData();
    return await getProceed(url);
}

export {
    getAll,
    getMyData,
    getById,
    create,
    update,
    deleteRecord,
    getCommentForGame,
    createComment,
    register,
    login,
    logout
}; 