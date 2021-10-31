function solve() {
    let id = '1567';
    const arriveBtn = document.getElementById('arrive');
    const departBtn = document.getElementById('depart');
    const stopName = document.getElementById('info');
    stopName.textContent = 'depot';

    async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            stopName.textContent = data.name;
            id = data.next;

        } catch(e) {
            stopName.textContent = e.message;
            departBtn.disabled = true;
            arriveBtn.disabled = tue;
        }
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();