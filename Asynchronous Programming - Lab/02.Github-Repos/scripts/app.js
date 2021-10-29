async function loadRepos() {
	const repos = document.getElementById('repos');
	const name = document.getElementById('username').value;
	const url = `https://api.github.com/users/${name}/repos`;

	repos.innerHTML = '';

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Error code: ${response.status}`);
		}

		const data = await response.json();
		
		data.forEach(r => {
			let li = document.createElement('li');
			let a = document.createElement('a');
	
			a.textContent = r.full_name;
			a.href = r.html_url;
	
			li.appendChild(a);
			repos.appendChild(li);
		});
	} catch (error) {
		let li = document.createElement('li');
		li.textContent = error.message;
		repos.appendChild(li);
	}
	
}