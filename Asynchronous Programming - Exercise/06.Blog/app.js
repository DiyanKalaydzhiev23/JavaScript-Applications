async function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', load);
}

async function load() {
    const posts = document.getElementById('posts');
    const postsURL = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(postsURL);
    const data = await response.json();

    Object.values(data).forEach(o => {
        let option = document.createElement('option');

        option.value = o.id;
        option.textContent = o.title;

        posts.append(option);
    });

    document.getElementById('btnViewPost').addEventListener('click', view);

    async function view() {
        const id = document.getElementById('posts').value;
    
        const commentsURL = `http://localhost:3030/jsonstore/blog/comments`;
        const responseComments = await fetch(commentsURL);
        const dataComments = await responseComments.json();
        
        const postTitle = document.getElementById('post-title');
        const postBody = document.getElementById('post-body');
        const postComments = document.getElementById('post-comments');

        postTitle.textContent = data[id].title;
        postBody.textContent = data[id].body;
        postComments.innerHTML = '';
        
        Object.values(dataComments).forEach(d => {
            if (d.postId === id) {
                const comment = document.createElement('li');
                comment.textContent = d.text;
                postComments.append(comment);
            }
        });
    }
}

attachEvents();
