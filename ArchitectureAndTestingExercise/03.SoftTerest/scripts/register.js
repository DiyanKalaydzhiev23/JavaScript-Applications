import { displayElement, attachEvent } from "./app.js";
import { openLogin } from "./login.js";

function openRegister(e) { 
    e.preventDefault();

    displayElement('registerForm', true);
    attachEvent('signUpBtn', validate);
    attachEvent('signInLink', openLogin);
}

function validate(e) {
    e.preventDefault();

    const form = e.target.parentNode;
    let message;

    if (form.email.value.length < 3 ) {
        message = 'Email must be at least 3 symbols long!';
    } else if (/\d/.test(form.email.value) == false) {
        message = 'Email must contain digit!';
    } else if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(form.email.value) == false) {
        message = 'Email must contain special symbol!';
    } else if (form.password.value.length < 3) {
        message = 'Password must be at least 3 symbols long';
    } else if (form.password.value !== form.inputRepeatPassword.value) {
        message = 'Passwords must match!';
    }

    if (message) {
        alert(message);
        return;
    }

    signUp(email, password);
}

async function signUp(email, password) {
    const url = 'http://localhost:3030/users/register';
    const data = {
        email,
        password
    };
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);
        const dataResponse = await response.json();

        if (response.status == 200) {
            sessionStorage.setItem('authToken', dataResponse.accessToken);
            openLogin();
        } else {
            throw new Error(response.status);
        }
    } catch (e) {
        alert(e.message);
    }
}

export { openRegister };