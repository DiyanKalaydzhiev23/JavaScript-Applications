import { createTemplate } from '../templates.js';
import { create } from '../requests.js';

function createPage(ctx) {
    ctx.render(createTemplate());
    document.getElementById('submitBtn').addEventListener('click', validate);
}

function validate(e) {
    e.preventDefault();

    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    let errorText = '';

    function switchToInvalid(element, text) {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        errorText += text;
    }

    for (let i = 0; i < inputs.length - 1; i++) {
        inputs[i].classList.remove('is-invalid');
        inputs[i].classList.add('is-valid');
    }

    if (form.make.value.length < 4) {
        switchToInvalid(form.make, 'Make must be at least 4 symbols long!\n');
    }
    if (form.model.value.length < 4) {
        switchToInvalid(form.model, 'Model must be at least 4 symbols long!\n');
    } 
    if (Number(form.year.value) <= 1950 || Number(form.year.value) >= 2050) {
        switchToInvalid(form.year, 'Year must be between 1950 and 2050\n');
    }
    if (form.description.value.length <= 10) {
        switchToInvalid(form.description, 'Description must be more then 10 symbols!\n');
    }
    if (form.price.value <= 0) {
        switchToInvalid(form.price, 'Price must be positive number!\n');
    }
    if (form.img.value.length === 0) {
        switchToInvalid(form.img, 'Image URL is required!\n');
    }

    if (errorText.length > 0) {
        alert(errorText);
    } else {
        create(
            form.make.value,
            form.model.value, 
            form.year.value, 
            form.description.value, 
            form.price.value, 
            form.img.value, 
            form.material.value
        );

        window.location.href = '/01.Furniture';
    }
}

export {createPage};