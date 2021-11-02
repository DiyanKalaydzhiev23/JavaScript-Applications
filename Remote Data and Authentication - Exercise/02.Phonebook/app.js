function attachEvents() {
    const createBtn = document.getElementById('btnCreate');
    const loadBtn = document.getElementById('btnLoad');
    
    createBtn.addEventListener('click', create);
    loadBtn.addEventListener('click', load);
}

async function create() {
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    const url = 'http://localhost:3030/jsonstore/phonebook';

    const data = {
        person: person.value,
        phone: phone.value
    }

    const options = {
        method: 'post',
        headers: {'Content-type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(url, options);
}

async function load() {
    const phoneBook = document.getElementById('phonebook');
    phoneBook.innerHTML = '';

    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(u => {
        let deleteBtn = document.createElement('button');
        let li = document.createElement('li');

        deleteBtn.textContent = 'Delete';
        li.textContent = `${u.person}: ${u.phone}`;

        deleteBtn.addEventListener('click', findPhone);

        li.append(deleteBtn);
        phoneBook.append(li);
    });
}

async function findPhone(e) {
    const info = e.target.parentNode.textContent;
    const [name, phone] = info.slice(0, info.length-6).split(': ');

    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const data = await response.json();

    let key;
    Object.keys(data).forEach(k => {
        if (data[k].phone == phone && data[k].person == name) {
            key = k;
        }
    });

    deletePhone(e, key);
}

async function deletePhone(e, key) {
    const url = `http://localhost:3030/jsonstore/phonebook/${key}`;
    const options = { 
        method: 'delete',
        headers: {'Content-type': 'application/json.'},
    }

    const response = await fetch(url, options);

    e.target.parentNode.remove();
}
    
attachEvents();