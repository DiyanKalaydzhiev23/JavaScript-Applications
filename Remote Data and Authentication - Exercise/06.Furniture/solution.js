async function loadNotLogged() {
    const url = 'http://localhost:3030/data/furniture';
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}

function homeLogged() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [createBtn, buyBtn, ordersBtn] = document.querySelectorAll('button');
    
    createBtn.addEventListener('click', (e) => create(e, userData));
    buyBtn.addEventListener('click', () => buy(userData));

    displayFurniture();
    displayBasket(userData);
}

async function displayBasket(userData) {
    const allProducts = [];
    let totalPrice = 0;
    const [products, money] = document.getElementsByClassName('orders')[0].querySelectorAll('p span');
    products.textContent = '';
    money.textContent = '';

    const url = `http://localhost:3030/data/orders`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // data.forEach(f => {
    //     allProducts.push(f.name);
    //     totalPrice += Number(f.price);
    // });
    
}

async function buy(userData) {
    const rows = Array.from(document.querySelectorAll('tr')).slice(1);
    const selectedItems = {};

    rows.forEach(r => {
        let tds = r.querySelectorAll('td');
        if (tds[4].children[0].checked) {
            selectedItems[tds[1]] = tds[2];
        }
    });

    const url = 'http://localhost:3030/data/orders';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(selectedItems)
    }

    await fetch(url, options);
}

async function create(e, userData) {
    e.preventDefault();

    const form = document.querySelector('form');
    const url = 'http://localhost:3030/data/furniture';
    const data = {
        name: form.nameField.value,
        price: form.price.value,
        factor: form.factor.value,
        img: form.img.value
    }
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    }

    await fetch(url, options);
    displayFurniture();

    form.nameField.value = ''
    form.price.value = ''
    form.factor.value = ''
    form.img.value = ''
}

async function displayFurniture() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    const url = 'http://localhost:3030/data/furniture';
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(f => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img
                    src=${f.img}>
            </td>
            <td>
                <p>${f.name}</p>
            </td>
            <td>
                <p>${f.price}</p>
            </td>
            <td>
                <p>${f.factor}</p>
            </td>
            <td>
                <input type="checkbox"/>
            </td>
        `; // innerHTML only for exercise purposes
        tbody.append(tr);
    });
}

function loginPage() {
    const [registerBtn, loginBtn] = document.querySelectorAll('form button');
    
    registerBtn.addEventListener('click', register);
    loginBtn.addEventListener('click', login);
}

async function register(e) {
    e.preventDefault()
    
    const form = document.querySelectorAll('form')[0];

    if (form.password.value !== form.rePass.value) {
        createError(form, 'Passwords must match!');
        return;
    }

    if (form.email.value === '' && form.password.value === '') {
        createError(form, 'Email and password cannot be empty!');
        return;
    }

    const oldError = document.getElementById('error');
    if (oldError) oldError.remove();

    const url = 'http://localhost:3030/users/register';
    const data = {
        email: form.email.value,
        password: form.email.value
    }
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
            throw new Error(response.status);
        }
    } catch (error) {
        createError(form, error.message);
    }

}

async function login(e) {
    e.preventDefault()

    const form = document.querySelectorAll('form')[1];
    const url = 'http://localhost:3030/users/login'
    const data = {
        email: form.email.value,
        password: form.password.value
    }
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
        window.location.href = 'http://127.0.0.1:5500/06.Furniture/homeLogged.html';
    } catch (error) {
        createError(form, error.message);
    }
}

function createError(form, text) {
    const oldError = form.querySelector('div');
    if (oldError) oldError.remove();

    const divError = document.createElement('div');

    divError.textContent = text;
    divError.style.color = 'red';

    form.append(divError);
}
