function attachEvents() {
    const submitBtn = document.querySelector('form button');
    const loadBtn = document.getElementById('loadBooks');

    submitBtn.addEventListener('click', submit);
    loadBtn.addEventListener('click', load);
}

async function submit(e) {
    e.preventDefault();
    const author = document.getElementsByName('author')[0];
    const title = document.getElementsByName('title')[0];
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const data = {
        author: author.value,
        title: title.value,
    }

    const options = {
        method: 'post',
        headers: {'Content-type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(url, options);
    load();

    title.value = '';
    author.value = '';
}

async function load() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    const url = 'http://localhost:3030/jsonstore/collections/books';
    const response = await fetch(url);
    const data = await response.json();

    Object.keys(data).forEach(k => {
        let tr = document.createElement('tr');
        let tdTitle = document.createElement('td');
        let tdAuthor = document.createElement('td');
        let tdButtons = document.createElement('td');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        tdTitle.textContent = data[k].title;
        tdAuthor.textContent = data[k].author;
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        editBtn.addEventListener('click', () => editMenu(k, data[k].title, data[k].author));
        deleteBtn.addEventListener('click', (e) => deleteRow(e, k));

        tdButtons.append(editBtn);
        tdButtons.append(deleteBtn);
        tr.append(tdTitle);
        tr.append(tdAuthor);
        tr.append(tdButtons);
        tbody.append(tr);
    });
}

function editMenu(id, titleText, authorText) {
    const formName = document.querySelector('form h3');
    const author = document.getElementsByName('author')[0];
    const title = document.getElementsByName('title')[0];
    const submitBtn = document.querySelector('form button');

    formName.textContent = 'Edit FORM';
    title.value = titleText;
    author.value = authorText;

    submitBtn.removeEventListener('click', submit);
    submitBtn.addEventListener('click', (e) => edit(e, id, title, author));
}

async function edit(e, id, title, author) {
    e.preventDefault();
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    
    const data = {
        title: title.value,
        author: author.value
    }

    const options = {
        method: 'put',
        headers: {'Content-type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(url, options);
    normalView();
    load();
}

function normalView() {
    const formName = document.querySelector('form h3');
    const submitBtn = document.querySelector('form button');
    const author = document.getElementsByName('author')[0];
    const title = document.getElementsByName('title')[0];


    submitBtn.replaceWith(submitBtn.cloneNode(true));
    formName.textContent = 'FORM';
    author.value = '';
    title.value = '';

    submitBtn.addEventListener('click', submit);
}

async function deleteRow(e, id) {
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    const options = {method: 'delete'};

    await fetch(url, options);

    e.target.parentNode.parentNode.remove();
}

attachEvents();