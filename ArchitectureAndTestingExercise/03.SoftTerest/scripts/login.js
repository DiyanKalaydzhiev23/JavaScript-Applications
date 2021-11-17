import { displayElement, attachEvent, displayHome} from "./app.js";
import { openRegister } from "./register.js";

function openLogin(e) { 
    e.preventDefault();

    displayElement('loginForm', true);
    attachEvent('signInBtn', signIn);
    attachEvent('signUpLink', openRegister);
}

async function signIn(e) {
    e.preventDefault();

    const form = e.target.parentNode.parentNode;

    const url = 'http://localhost:3030/users/login';
    const data = {
        email: form.inputEmail.value,
        password: form.inputPassword.value
    }
    const options = {
        method: 'POST',
        headers: {'Content-type': 'application/json.'},
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
        displayHome();
    } catch (e) {
        alert(e.message);
    }
}

export { openLogin };