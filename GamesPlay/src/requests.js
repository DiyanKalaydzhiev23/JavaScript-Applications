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
    commentsForGame: (gameId) => { return `http://localhost:3030/data/comments?where=gameId%3D%22${gameId}%22`}
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
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            page.redirect('/home');
        } else {
            throw new Error(data.message);
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
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options);

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
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);

    if (response.status == 200) {
        page.redirect('/home');
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function deleteRecord(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.getById(id);
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: '{}'
    };

    const response = await fetch(url, options);

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

async function create(data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.create();
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);

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
    register,
    login,
    logout
}; 