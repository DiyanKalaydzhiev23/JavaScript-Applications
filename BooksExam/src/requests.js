import page from '../node_modules/page/page.mjs';
import { selectView } from './app.js';


const endpoints = {
    getAll: () => { return 'http://localhost:3030/data/books?sortBy=_createdOn%20desc' },
    register: () => { return 'http://localhost:3030/users/register' },
    login: () => { return 'http://localhost:3030/users/login' },
    create: () => { return 'http://localhost:3030/data/books'},
    myData: () => { 
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        return `http://localhost:3030/data/books?where=_ownerId%3D%22${userData.id}%22&sortBy=_createdOn%20desc`
    },
    getById: (id) => { return `http://localhost:3030/data/books/${id}`},
    like: () => { return `http://localhost:3030/data/likes`},
    userBookLike: (bookId, userId) => { return `http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count` },
    bookLikes: (bookId) => { return `http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`}
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

async function getAll() {
    const url = endpoints.getAll();
    const response = await fetch(url);

    if (response.status === 200) {
        return await response.json();
    }

    alert(`Error: ${response.status}`);
}

async function getById(id) {
    const url = endpoints.getById(id);
    const response = await fetch(url);

    if (response.status === 200) {
        return await response.json();
    }

    alert(`Error: ${response.status}`);
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

async function like(data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.like();
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options);

    if (response.status == 200) {
        const likeBtn = document.getElementById('like').remove();
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function getUserBookLike(bookId, userId) {
    const url = endpoints.userBookLike(bookId, userId);
    const response = await fetch(url);

    if (response.status === 200) {
        return await response.json();
    }

    alert(`Error: ${response.status}`);
}

async function getBookLikes(bookId) {
    const url = endpoints.bookLikes(bookId);
    const response = await fetch(url);

    if (response.status === 200) {
        return await response.json();
    }

    alert(`Error: ${response.status}`);
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
    const response = await fetch(url);

    if (response.status === 200) {
        return response.json();
    }
    alert(`Error: ${response.status}`);
}

export {
    getAll,
    getMyData,
    getById,
    create,
    update,
    deleteRecord,
    like,
    getUserBookLike,
    getBookLikes,
    register,
    login,
    logout
}; 