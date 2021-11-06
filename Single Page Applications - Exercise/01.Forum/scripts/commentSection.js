const postData = JSON.parse(sessionStorage.getItem('postData'));
const commentSection = document.getElementsByClassName('comment')[0];

function attachEvents() {
    const postBtn = document.getElementsByTagName('button')[0];
    postBtn.addEventListener('click', postComment);
}

async function postComment(e) {
    e.preventDefault();

    const comment = document.getElementById('comment');
    const username = document.getElementById('username');
    const date = new Date();

    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    const data = {
        comment: comment.value,
        username: username.value,
        date: date.toString(),
        postId: postData.id
    };
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(url, options);
    displayComments();

    comment.value = '';
    username.value = '';
}

async function displayComments() {
    const comments = document.getElementById('user-comment');
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    const response = await fetch(url);
    const data = await response.json();
    
    comments.innerHTML = '';
    Object.values(data).forEach(c => {
        if (c.postId === postData.id) {
            let wrapper = document.createElement('div');
            wrapper.className = 'topic-name-wrapper';
            wrapper.innerHTML = `
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p><strong>${c.username}</strong> commented on <time>${c.date}</time></p>
                        <div class="post-content">
                            <p>${c.comment}</p>
                        </div>
                    </div>
                </div>
            `; // innerHTML used only for exercise purposes, not gonna use in this scenario if real!
            comments.append(wrapper);
        }
    });
}

function displayPost() {
    commentSection.innerHTML = `
        <div class="header">
            <img src="./static/profile.png" alt="avatar">
            <p><span>${postData.username}</span> posted on <time>${postData.date}</time></p>
            <p class="post-content">${postData.text}</p>
        </div>

        <div id="user-comment"></div>
    `;
}



attachEvents();
displayPost();
displayComments();