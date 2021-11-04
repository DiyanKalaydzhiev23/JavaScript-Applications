let userData;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    const addBtn = document.getElementsByClassName('add')[0];
    const loadBtn = document.getElementsByClassName('load')[0];

    if (userData != null) {
        logged(userData);
        addBtn.addEventListener('click', add);
    } else {
        notLogged();
    }

    loadBtn.addEventListener('click', load);
});

function logged(userData) {
    document.getElementById('guest').style.display = 'none';
    document.querySelector('#addForm .add').disabled = false;
    document.querySelector('nav p span').textContent = userData.email;
}

function notLogged() {
    document.getElementById('user').style.display = 'none';
}


async function load() {
    const catches = document.getElementById('catches');
    catches.innerHTML = '';

    const url = 'http://localhost:3030/data/catches';
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(c => {
        let div = document.createElement('div');
        div.className = 'catch';
        div.innerHTML = `
        <label>Angler</label>
        <input type="text" class="angler" value=${c.angler}>
        <label>Weight</label>
        <input type="text" class="weight" value=${c.weight}>
        <label>Species</label>
        <input type="text" class="species" value=${c.species}>
        <label>Location</label>
        <input type="text" class="location" value=${c.location}>
        <label>Bait</label>
        <input type="text" class="bait" value=${c.bait}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value=${c.captureTime}>
        <button class="update" data-id=${c._id} ${c._ownerId !== userData.id ? 'disabled' : ''}>Update</button>
        <button class="delete" data-id=${c._id} ${c._ownerId !== userData.id ? 'disabled' : ''}>Delete</button>
        `;
        catches.appendChild(div);

        let [updateBtn, deleteBtn] = div.querySelectorAll('button');
        deleteBtn.addEventListener('click', deleteCatch);
        updateBtn.addEventListener('click', update);
    });
}

async function update(e) {
    const id = e.target.getAttribute('data-id');
    const url = `http://localhost:3030/data/catches/${id}`;
    const data = {
        _ownerId: userData.id,
        angler: e.target.parentNode.querySelector('.angler').value,
        weight: e.target.parentNode.querySelector('.weight').value,
        species: e.target.parentNode.querySelector('.species').value,
        location: e.target.parentNode.querySelector('.location').value,
        bait: e.target.parentNode.querySelector('.bait').value,
        captureTime: e.target.parentNode.querySelector('.captureTime').value
    };
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(data)
    }

    await fetch(url, options);
}

async function deleteCatch(e) {
    const id = e.target.getAttribute('data-id');
    const url = `http://localhost:3030/data/catches/${id}`;
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData.token
        },
    }

    await fetch(url, options);

    e.target.parentNode.remove();
}

async function add(e) {
    e.preventDefault();
    const url = 'http://localhost:3030/data/catches';

    const data = {
        _ownerId: userData.id,
        angler: addForm.angler.value,
        weight: addForm.weight.value,
        species: addForm.species.value,
        location: addForm.location.value,
        bait: addForm.bait.value,
        captureTime: addForm.captureTime.value
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
}