import {html, render} from  'https://unpkg.com/lit-html?module';
import { towns } from './towns.js'; 

const root = document.getElementById('towns');
const searchBtn = document.getElementById('searchBtn');

const townsTemplate = (towns) => html`
   <ul>
      ${towns.map(t => html`<li>${t}</li>`)}
   </ul>
`;

function search() {
   let matches = 0;
   const searchedText = document.getElementById('searchText').value.toLowerCase();
   const liTowns = Array.from(document.getElementsByTagName('li'));

   liTowns.forEach(li => {
      li.className = '';

      if (li.textContent.toLowerCase().includes(searchedText)) {
         li.className = 'active';
         matches += 1;
      }
   });

   displayMatches(matches);
}

function displayMatches(matches) {
   const matchHolder = document.getElementById('result');
   matchHolder.textContent = `${matches} matches found`;
}

function displayTowns(root) {
   const result = townsTemplate(towns);
   render(result, root);
}

searchBtn.addEventListener('click', search);
displayTowns(root);