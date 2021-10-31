function attachEvents() {
    const images = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        degrees: '°'
    };
    const location = document.getElementById('location');
    const submit = document.getElementById('submit');
    submit.addEventListener('click', () =>  {
        const forecast = document.getElementById('forecast');
        forecast.style.display = 'block';

        try {
            submitLocation(location.value, images);
        } catch (e) {
            const forecasts = createElement('div', 'forecasts', e.message);
            forecast.append(forecasts);
            console.log(e.message);
        }
    });
}

async function submitLocation(location, images) {
    const url = `http://localhost:3030/jsonstore/forecaster/locations`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`)

    const data = await response.json();
    
    data.forEach(t => {
        if (t.name === location) {
            getToday(t.code, images);
            getTomorrow(t.code, images);
        }
    });
}

async function getToday(code, images) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    const current = document.getElementById('current');
    
    const forecasts = createElement('div', 'forecasts');
    const conditionSymbol = createElement('span', 'condition symbol', images[data.forecast.condition]);
    const conditionSpan = createElement('span', 'condition', null);
    const location = createElement('span', 'forecast-data', data.name);
    const degrees = createElement('span', 'forecast-data', `${data.forecast.low}${images.degrees}/${data.forecast.high}${images.degrees}`);
    const condition = createElement('span', 'forecast-data', data.forecast.condition);

    conditionSpan.append(location);
    conditionSpan.append(degrees);
    conditionSpan.append(condition);
    forecasts.append(conditionSymbol);
    forecasts.append(conditionSpan);
    current.append(forecasts);
}

async function getTomorrow(code, images) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    const upcoming = document.getElementById('upcoming');
    const forecastInfo = createElement('div', 'forecast-info');

    data.forecast.forEach(d => {
        let spanUpcoming = createElement('span', 'upcoming');
        let symbol = createElement('span', 'symbol', images[d.condition]);
        let degrees = createElement('span', 'forecast-data', `${d.low}${images.degrees}/${d.high}${images.degrees}`);
        let condition = createElement('span', 'forecast-data', d.condition)
        
        spanUpcoming.append(symbol);
        spanUpcoming.append(degrees);
        spanUpcoming.append(condition);
        forecastInfo.append(spanUpcoming);
    });

    upcoming.append(forecastInfo);
}

function createElement(type, className, textContent) {
    const element = document.createElement(type);

    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    
    return element;
}

attachEvents();