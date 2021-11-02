function attachEvents() {
    const name = document.getElementsByName('author')[0];
    const message = document.getElementsByName('content')[0];
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    sendBtn.addEventListener('click', () => submit(name.value, message.value));
    refreshBtn.addEventListener('click', refresh);
}

async function submit(author, content) {
    const URL = 'http://localhost:3030/jsonstore/messenger';
    const data = {author: author, content: content};
    const options = {
        method: 'post',
        headers: {'Content-type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(URL, options);
}

async function refresh() {
    const URL = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(URL);
    const data = await response.json();
    
    displayMessages(data);
}

function displayMessages(data) {
    const messages = document.getElementById('messages');

    messages.textContent = '';
    
    Object.values(data).forEach(t => {
        messages.textContent += `${t.author}: ${t.content}\n`;
    });
}

attachEvents();