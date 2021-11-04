function attachEvents() {
    const registerBtn = document.querySelector('form button');
    registerBtn.addEventListener('click', validate);
}

function validate(e) {
    e.preventDefault();

    const email = document.getElementsByName('email')[0];
    const password = document.getElementsByName('password')[0];
    const repeat = document.getElementsByName('rePass')[0];

    if (password.value !== repeat.value) {
        createError('Passwords must match!');
        return;
    }

    if (email.value === '' && password.value === '') {
        createError('Email and password cannot be empty!');
        return;
    }

    const oldError = document.getElementById('error');
    if (oldError) oldError.remove();

    register(email.value, password.value);
}

async function register(email, password) {
    const url = 'http://localhost:3030/users/register';
    const data = {email, password};
    const options = {
        method: 'post',
        headers: {'Content-type': 'application/json.'},
        body: JSON.stringify(data)
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            window.location.href = 'http://127.0.0.1:5500/05.Fisher-Game/src/index.html';
            const name = document.querySelector('nav p span');
            name.textContent = email.value;
        } else {
            throw new Error(data.message);
        }
    } catch (e) {
        createError(e.message);
    }
} 

function createError(text) {
    const oldError = document.getElementById('error');
    if (oldError) oldError.remove();

    const form = document.getElementById('register-view').children[1];
    const divError = document.createElement('div');

    divError.textContent = text;
    divError.style.color = 'red';
    divError.id = 'error';

    form.append(divError);
}

attachEvents();