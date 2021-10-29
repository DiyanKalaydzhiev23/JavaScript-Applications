async function loadCommits() {
    const commits = document.getElementById('commits');
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    commits.innerHTML = '';

    try {
        const response = await fetch(url);  

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        data.forEach(c => {
            let li = document.createElement('li');
            li.textContent = `${c.commit.author.name}: ${c.commit.message}`;
            commits.appendChild(li);
        });
    } catch (error) {
        console.log(error.message);
    }
}