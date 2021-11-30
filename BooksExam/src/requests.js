import page from '../node_modules/page/page.mjs';
import { selectView } from './app.js';

const endpoints = {
    getAll: () => { return 'http://localhost:3030/data/books?sortBy=_createdOn%20desc' },
    register: () => { return 'http://localhost:3030/users/register' },
    login: () => { return 'http://localhost:3030/users/login' },
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


export {
    getAll,
    register,
    login,
    logout
}; 