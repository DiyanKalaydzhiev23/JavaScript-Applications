import { openRegister } from './register.js';
import { openLogin } from "./login.js";

function removeDisplayAll() {
    const sections = Array.from(document.getElementsByClassName('section'));
    sections.forEach(s => {
        s.style.display = 'none';
    });
}

function attachEvent(elementId, functionReference) {
    const element = document.getElementById(elementId);
    element.addEventListener('click', functionReference);
}

function attachAllEvents() {
    attachEvent('navRegister', openRegister);
    attachEvent('navLogin', openLogin);
}

function displayElement(elementId, removeAll) {
    if (removeAll) removeDisplayAll();

    const element = document.getElementById(elementId);
    element.style.display = 'block';
}

function displayHome() {
    displayElement('nav', true);
    displayElement('home');
    displayElement('footer');
}

displayHome();
attachAllEvents();

export { displayElement, attachEvent, displayHome};