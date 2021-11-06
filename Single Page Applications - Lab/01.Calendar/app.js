let yearsCalendar;
let monthsCalendar;
let daysCalendar;

const body = document.getElementsByTagName('body')[0];

const monthsToNumbers = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sept: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
}

function getAll() {
    yearsCalendar = document.getElementById('years');
    monthsCalendar = document.getElementsByClassName('monthCalendar');
    daysCalendar = document.getElementsByClassName('daysCalendar');
    makeNotVisible();
}

function makeNotVisible() {
    yearsCalendar.style.display = 'none';
    Array.from(monthsCalendar).forEach(m => m.style.display = 'none');
    Array.from(daysCalendar).forEach(d => d.style.display = 'none');
}

function makeVisible(collection) {
    makeNotVisible();
    collection.style.display = 'block';
}

function displayYears() {
    const years = yearsCalendar.getElementsByClassName('day');
    makeVisible(yearsCalendar);

    Array.from(years).forEach(y => {
        y.addEventListener('click', displayMonths);
    });
}

function displayMonths(e) {
    let year = e.target.children[0];
    if (!year) year = e.target;

    Array.from(monthsCalendar).forEach(m => {
        if (m.id == `year-${year.textContent}`) {
            makeVisible(m);

            Array.from(m.getElementsByClassName('day')).forEach(d => {
                d.addEventListener('click', (e) => displayDays(e, year.textContent));
            });

            m.getElementsByTagName('caption')[0].addEventListener('click', () => {
                makeVisible(document.getElementById('years'));
            });
        }
    });
}

function displayDays(e, year) {
    let month = e.target.children[0];
    if (!month) month = e.target;
    
    Array.from(daysCalendar).forEach(d => {
        if (d.id == `month-${year}-${monthsToNumbers[month.textContent]}`) {
            makeVisible(d);

            d.getElementsByTagName('caption')[0].addEventListener('click', () => {
                makeVisible(document.getElementById(`year-${year}`));
            });
        }
    });
}

getAll();
displayYears();