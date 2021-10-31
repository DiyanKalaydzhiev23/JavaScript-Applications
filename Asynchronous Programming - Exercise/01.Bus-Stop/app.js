async function getInfo() {
    const busId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const data = await response.json();

        stopName.textContent = data.name;

        buses.innerHTML = '';
        Object.entries(data.buses).forEach(busInfo => {
            let li = document.createElement('li');
            li.textContent = `Bus ${busInfo[0]} arrives in ${busInfo[1]} minutes`;
            buses.append(li);
        });
        
    } catch (error) {
        console.log(error.message);
    }
}