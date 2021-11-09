import {displayElement, createError} from './app.js';
import { displayLogin } from './login.js';

const singUpForm = document.getElementById('form-sign-up').children[0];

function displayRegister() {
    const submit = singUpForm.querySelector('button');
    submit.addEventListener('click', validate);

    displayElement('form-sign-up', true);
}

function validate(e) {
    e.preventDefault();

    if (singUpForm.email.value === '') {
        createError('Email cannot be empty string!', singUpForm);
        return;
    }

    if (singUpForm.password.value.length < 6) {
        createError('Password should be at least 6 symbols', singUpForm);
        return;
    }

    if (singUpForm.password.value !== singUpForm.repeatPassword.value) {
        createError('Passwords must match!', singUpForm);
        return;
    }

    const oldError = singUpForm.querySelector('#error');
    if (oldError) oldError.remove();

    sendRequest(singUpForm.email.value, singUpForm.password.value);
}

async function sendRequest(email, password) {
    const url = 'http://localhost:3030/users/register';
    const data = {email, password};
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
        const responseData = await response.json();
        sessionStorage.setItem('authToken', responseData.accessToken);
        displayLogin();

        document.getElementsByClassName('nav-item')[3].style.display = 'none';
    } else {
        createError(`Error code: ${response.status}`, singUpForm);
        return;
    }
}

export {displayRegister};