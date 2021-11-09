import {displayElement, createError} from './app.js';

const loginForm = document.getElementById('form-login').children[0];

function displayLogin() {
    const submit = loginForm.querySelector('button');
    submit.addEventListener('click', validate);

    displayElement('form-login', true);
}

function validate(e) {
    e.preventDefault();

    if (loginForm.email.value === '') {
        createError('Email cannot be empty string!', loginForm);
        return;
    }

    if (loginForm.password.value.length < 6) {
        createError('Password should be at least 6 symbols', loginForm);
        return;
    }

    const oldError = loginForm.querySelector('#error');
    if (oldError) oldError.remove();

    sendRequest(loginForm.email.value, loginForm.password.value);
}

async function sendRequest(email, password) {
    const url = 'http://localhost:3030/users/login';
    const data = {email, password};
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.status === 200) {
        sessionStorage.setItem('authToken', responseData.accessToken);
        
        displayElement('home-page', true);
        displayElement('title');
        displayElement('add-movie-button');
        displayElement('movie');

        document.getElementsByClassName('nav-link')[0].textContent = `Welcome, ${responseData.email}`;
        document.getElementsByClassName('nav-item')[2].style.display = 'none';
    } else {
        createError(`User doesn't exist`, loginForm);
        return;
    }

    const userData = {
        email: responseData.email,
        id: responseData._id,
        token: responseData.accessToken
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export {displayLogin};