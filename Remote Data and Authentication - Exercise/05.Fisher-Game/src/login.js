function attachEvent() {
    const loginBtn = document.querySelector('form button');
    loginBtn.addEventListener('click', login);
}

async function login(e) {
    e.preventDefault();

    const notification = document.getElementsByClassName('notification')[0];
    const email = document.getElementsByName('email')[0];
    const password = document.getElementsByName('password')[0];

    notification.textContent = '';

    if (email.value == '' && password.value == '') {
        notification.textContent = 'Email and password cannot be empty!';
    }

    const url = 'http://localhost:3030/users/login';
    const data = {
        email: email.value,
        password: password.value
    }
    const options = {
        method: 'post',
        headers: {'Content-type': 'application/json.'},
        body: JSON.stringify(data)
    }
    
    try {
        const response = await fetch(url, options);

        if (response.status == 200) {
            sessionStorage.setItem('authToken', response.accessToken);
        } else {
            throw new Error('User doesn\'t exist');
        }

        const responseData = await response.json();
        const userData = {
            email: responseData.email,
            id: responseData._id,
            token: responseData.accessToken
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'http://127.0.0.1:5500/05.Fisher-Game/src/index.html';
    } catch (e) {
        notification.textContent = e.message;
    }


}


window.addEventListener('load', attachEvent);