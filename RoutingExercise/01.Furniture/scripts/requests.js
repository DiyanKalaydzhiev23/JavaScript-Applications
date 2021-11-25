let url = 'http://localhost:3030/data/catalog';

async function getFurniture(myFurniture) {
    if (myFurniture) {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        url = `http://localhost:3030/data/catalog?where=_ownerId%3D%22${userData.id}%22`;
    } else {
        url = 'http://localhost:3030/data/catalog';
    }
    
    const response = await fetch(url);
    return await response.json();
} 


async function getFurnitureById(id) {
    const url = `http://localhost:3030/data/catalog?where=_id%3D%22${id}%22`;
    const response = await fetch(url);
    
    return await response.json();
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
            email: responseData.email,
            id: responseData._id,
            token: responseData.accessToken
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = '/01.Furniture';
    } catch (e) {
        alert(e.message);
    }
}


async function register(email, password) {
    const url = 'http://localhost:3030/users/register';
    const data = {
        email,
        password
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
            window.location.href = '/01.Furniture';
        } else {
            throw new Error(data.message);
        }
    } catch (e) {
        alert(e.message);
    }
}


async function create(make, model, year, description, price, img, material) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const data = {
        _ownerId: userData.id,
        make,
        model,
        year,
        description,
        price,
        img,
        material
    };
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    };

    await fetch(url, options);
}

async function deleteFurniture(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = `http://localhost:3030/data/catalog/${id}`;
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData.token
        },
        body: '{}'
    };

    await fetch(url, options);
    window.location.href = '/01.Furniture';
}


async function editFurniture(make, model, year, description, price, img, material, id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const url = `http://localhost:3030/data/catalog/${id}`;
    const data = {
        _ownerId: userData.id,
        make,
        model,
        year,
        description,
        price,
        img,
        material
    };
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    };

    await fetch(url, options);
    window.location.href = '/01.Furniture';
}


export {
    getFurniture,
    login,
    register,
    create,
    getFurnitureById,
    deleteFurniture,
    editFurniture
};
