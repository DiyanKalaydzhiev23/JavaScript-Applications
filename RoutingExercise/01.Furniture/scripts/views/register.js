import { registerTemplate } from '../templates.js';
import { register } from '../requests.js';

function registerPage(ctx) {
    ctx.render(registerTemplate());
    document.getElementById('submitRegister').addEventListener('click', validate);
}

function validate(e) {
    e.preventDefault();
    
    const form = document.getElementsByTagName('form')[0];
    
    if (form.email.value.length < 3) {
        alert('Email not valid!');
    } else if (form.password.value !== form.rePass.value) {
        alert('Passwords don\'t match!');
    } else {
        register(form.email.value, form.password.value);
    }

}

export {registerPage};