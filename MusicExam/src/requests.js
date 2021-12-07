import page from '../node_modules/page/page.mjs';
import { selectView } from './app.js';


const endpoints = {
    getAll: () => { return 'http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name' },
    register: () => { return 'http://localhost:3030/users/register' },
    login: () => { return 'http://localhost:3030/users/login' },
    create: () => { return 'http://localhost:3030/data/albums' },
    getById: (id) => { return `http://localhost:3030/data/albums/${id}`},
    getByName: (name) => { return `http://localhost:3030/data/albums?where=name%20LIKE%20%22${name}%22`}
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


// Queries >>>>>>>>>>>>>>>>>

// <<<<<<< Login, Register, Logout queries >>>>>>>

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

// <<<<<<<>>>>>>>

// <<<<<<< GET queries >>>>>>>

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

async function getByName(name) {
    const url = endpoints.getByName(name);
    return await getProceed(url);
}

// <<<<<<<>>>>>>>

// POST queries >>>>>>>>>>>>>>>

async function create(data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.create();
    const response = await fetch(url, options.post(data, userData));

    if (response.status == 200) {
        page.redirect('/catalog');
    } else {
        alert(`Error: ${response.status}`);
    }
}

// <<<<<<<>>>>>>>

// PUT queries >>>>>>>>>>>>>>>

async function update(data, id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.getById(id);
    const response = await fetch(url, options.put(data, userData));

    if (response.status == 200) {
        page.redirect(`/details/${id}`);
    } else {
        alert(`Error: ${response.status}`);
    }
}

// <<<<<<<>>>>>>>

// DELETE queries >>>>>>>>>>>>>>>

async function deleteRecord(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = endpoints.getById(id);
    const response = await fetch(url, options.delete(userData));

    if (response.status == 200) {
        page.redirect('/catalog');
    } else {
        alert(`Error: ${response.status}`);
    }
}



export {
    getAll,
    getById,
    getByName,
    create,
    update,
    deleteRecord,
    register,
    login,
    logout
}; 