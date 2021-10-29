async function load() {
    const main = document.getElementsByTagName('main')[0];
    const urlRecipes = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const urlDetails = 'http://localhost:3030/jsonstore/cookbook/details';

    main.innerHTML = '';

    try {
        const responses = await Promise.all([
            fetch(urlRecipes),
            fetch(urlDetails)
        ]);

        const recipe = await responses[0].json();
        const details = await responses[1].json();
        
        Object.values(recipe).forEach(r => {
           let articlePreview = createElement('article', null, ['preview']);
           let divTitle = createElement('div', null, ['title']);
           let firstArtH2 = createElement('h2', r.name);
           let divSmall = createElement('div', null, ['small']);
           let img = createElement('img');

           img.src = r.img;
           
           divTitle.append(firstArtH2);
           divSmall.append(img);
           articlePreview.append(divTitle);
           articlePreview.append(divSmall);
           main.append(articlePreview);
        });

    } catch (error) {
        console.log(error);
    }
}

function createElement(type, textContent, classList) {
    const element = document.createElement(type);

    if (textContent) element.textContent = textContent;

    if (classList) {
        classList.forEach(c => element.classList.add(c));
    }

    return element;
}

window.addEventListener('load', () => {
    load();
});