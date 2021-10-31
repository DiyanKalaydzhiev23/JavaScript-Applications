async function load() {
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    const response = await fetch(url);
    const data = await response.json();
    const main = document.getElementById('main');

    data.forEach(a => {
        let accordion = document.createElement('div');
        accordion.className = 'accordion';
        accordion.innerHTML = `
            <div class="head">
                <span>${a.title}</span>
                <button class="button" id=${a._id}>More</button>
            </div>
            <div class="extra">
            </div>
        `;
        main.append(accordion);
        document.getElementById(a._id).addEventListener('click', loadMore);
    });
}

async function loadMore(e) {
    const button = e.target;
    const moreInfo = e.target.parentNode.nextElementSibling;
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${button.id}`;
    const response = await fetch(url);
    const data = await response.json();
    const paragraph = document.createElement('p');

    paragraph.textContent = data.content;
    button.textContent = 'Less';

    moreInfo.append(paragraph);
    moreInfo.style.display = 'inline';
    
    button.removeEventListener('click', loadMore);
    button.addEventListener('click', display);
}

function display(e) {
    const moreInfo = e.target.parentNode.nextElementSibling;

    if (moreInfo.style.display == 'inline') {
        moreInfo.style.display = 'none';
        e.target.textContent = 'More';
    } else {
        moreInfo.style.display = 'inline';
        e.target.textContent = 'Less';
    }
}

load();