function attachEvents() {
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', validate);
}

function validate(e) {
    e.preventDefault();
    
    if (form.firstName.value !== '' &&
    form.lastName.value !== '' &&
    form.facultyNumber.value !== '' &&
    form.grade.value !== '') {
        console.log(form.lastName.value);
        addToDB(form.firstName.value, form.lastName.value, form.facultyNumber.value, form.grade.value);
    }
}

async function addToDB(firstName, lastName, facultyNumber, grade) {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const data = {
        firstName,
        lastName,
        facultyNumber,
        grade
    }

    const options = {
        method: 'post',
        headers: {'Content-type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(url, options);
    display();
}

async function display(e) {
    const results = document.getElementById('results').querySelector('tbody');
    results.innerHTML = '';

    const url = 'http://localhost:3030/jsonstore/collections/students';
    const response = await fetch(url);
    const data = await response.json();
    
    Object.values(data).forEach(d => {
        let tr = document.createElement('tr');
        let tdFirstName = document.createElement('td');
        let tdLastName = document.createElement('td');
        let tdFacultyNumber = document.createElement('td');
        let tdGrade = document.createElement('td');
        
        tdFirstName.textContent = d.firstName;
        tdLastName.textContent = d.lastName;
        tdFacultyNumber.textContent = d.facultyNumber;
        tdGrade.textContent = d.grade;
        
        tr.append(tdFirstName);
        tr.append(tdLastName);
        tr.append(tdFacultyNumber);
        tr.append(tdGrade);

        results.append(tr);
    });
}

attachEvents();