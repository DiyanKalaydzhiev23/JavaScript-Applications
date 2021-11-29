import page from '../node_modules/page/page.mjs';
import { selectView } from './app.js';
import { notify } from './notify.js';

async function getAll() {
    const url = 'http://localhost:3030/data/memes?sortBy=_createdOn%20desc';
    const response = await fetch(url);
    const data = await response.json();

    return data;
} 

async function register(username, email, password, gender) {
    const url = 'http://localhost:3030/users/register';
    const data = {
        username,
        email,
        password,
        gender
    };
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            page.redirect('/allMemes');
        } else {
            throw new Error(data.message);
        }
    } catch (e) {
        alert(e.message);
    }
}

async function login(email, password) {
    const url = 'http://localhost:3030/users/login';
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
            username: responseData.username,
            email: responseData.email,
            id: responseData._id,
            token: responseData.accessToken
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        selectView();
    } catch (e) {
        notify(e.message);
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
    
    if (response.status !== 200) {
        alert(`Error: ${response.status}`);
        return;
    }

    sessionStorage.clear();
    selectView();
}

async function createMeme(title, description, imageUrl) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = 'http://localhost:3030/data/memes';
    const data = {
        title,
        description,
        imageUrl
    };
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options);

    if (response.status === 200) {
        page.redirect('/allMemes');
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function getMyMemes(userData) {
    const url = `http://localhost:3030/data/memes?where=_ownerId%3D%22${userData.id}%22&sortBy=_createdOn%20desc`;
    const response = await fetch(url);
    
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }

    alert(`Error: ${response.status}`);
} 

async function getMemeById(id) {
    const url = `http://localhost:3030/data/memes/${id}`;
    const response = await fetch(url);

    if (response.status === 200) {
        return await response.json();
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function updateMeme(id, title, description, imageUrl) {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    const url = `http://localhost:3030/data/memes/${id}`;
    const data = {
        title,
        description,
        imageUrl
    };
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    
    if (response.status === 200) {
        page.redirect(`/details/${id}`);
    } else {
        alert(`Error: ${response.status}`);
    }
}

async function deleteMeme(id) {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    const url = `http://localhost:3030/data/memes/${id}`;
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
        page.redirect('/allMemes');
    } else {
        alert(`Error: ${response.status}`);
    }
}

export {
    getAll,
    register,
    login,
    logout,
    createMeme,
    getMyMemes,
    getMemeById,
    updateMeme,
    deleteMeme
};