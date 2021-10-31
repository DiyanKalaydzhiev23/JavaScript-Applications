async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const response = await fetch(url);

    const data = await response.json();
    const main = document.getElementById('main');

    Object.values(data).forEach(p => {
        let div = document.createElement('div');
        div.className = 'profile';
        div.innerHTML = `
                <img src="./iconProfile2.png" class="userIcon" />
                <label>Lock</label>
                <input type="radio" name="user1Locked" value="lock" checked>
                <label>Unlock</label>
                <input type="radio" name="user1Locked" value="unlock"><br>
                <hr>
                <label>Username</label>
                <input type="text" name="user1Username" value=${p.username} disabled readonly />
                <div id="user1HiddenFields">
                    <hr>
                    <label>Email:</label>
                    <input type="email" name="user1Email" value=${p.email} disabled readonly />
                    <label>Age:</label>
                    <input type="email" name="user1Age" value=${p.age} disabled readonly />
                </div>
                <button>Show more</button>
            `;
        main.append(div);
    });

    lockUnlock();
}

function lockUnlock() {
    const showButtons = Array.from(document.querySelectorAll('div button'));
    showButtons.forEach(btn => btn.addEventListener('click', showMore));

    function showMore(event) {
        const parent = event.target.parentNode;
        const locked = parent.getElementsByTagName('input')[0];
        const moreInfo = parent.getElementsByTagName('div')[0];

        if (locked.checked == false && event.target.textContent === 'Show more') {
            moreInfo.style.display = 'block';
            event.target.textContent = 'Hide it';
        } else if (locked.checked == false && event.target.textContent === 'Hide it') {
            moreInfo.style.display = 'none';
            event.target.textContent = 'Show more';
        }
    }
}
