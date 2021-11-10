import { displayLogin } from "./login.js";

function logout() {
    const navigation = document.getElementsByClassName('nav-item');
    navigation[0].children[0].textContent = 'Welcome, email';
    Array.from(navigation).forEach(n => n.style.display = 'block');

    sessionStorage.clear();
    
    displayLogin();
}

export {logout};