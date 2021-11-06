const title = document.getElementById('topicName');
const username = document.getElementById('username');
const text = document.getElementById('postText');

function attachEvents() {
    const postBtn = document.getElementsByClassName('public')[0];
    const cancelBtn = document.getElementsByClassName('cancel')[0];

    postBtn.addEventListener('click', post);
    cancelBtn.addEventListener('click', emptyFields);
}

function emptyFields(e) {
    e.preventDefault();

    title.value = '';
    username.value = '';
    text.value = '';
}

async function post(e) {
    e.preventDefault();
    const timePosted = new Date();

    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    const data = {
        title: title.value,
        username: username.value,
        text: text.value,
        date: timePosted.toString()
    }

    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(url, options);

    displayPosts();
    emptyFields();
}

async function displayPosts() {
    const container = document.getElementsByClassName('topic-container')[0];
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    const response = await fetch(url);
    const posts = await response.json();

    container.innerHTML = '';
    Object.values(posts).forEach(p => {
        let wrapper = document.createElement('div');
        wrapper.className = 'topic-name-wrapper';
        wrapper.innerHTML = `
            <div class="topic-name">
                <a href="./theme-content.html" class="normal">
                    <h2>${p.title}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${p.date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${p.username}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `; // innerHTML used only for exercise, not gonna use in real project in this case
        container.append(wrapper);
        let link = wrapper.querySelector('a');
        link.addEventListener('click', () => savePostData(p.title, p.username, p.text, p.date, p._id));
    });
}

function savePostData(title, username, text, date, id) {
    sessionStorage.setItem('postData', JSON.stringify({title, username, text, date, id}));
}

attachEvents();
displayPosts();