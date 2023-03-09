import alerts from "../utils/alerts.js";
import { fetchApi } from "../utils/fetch.js";

export function isConnected() {
    if(localStorage.userId && localStorage.token) {
        return true;
    } else {
        return false;
    }
}

export function logout() {
    localStorage.clear();
    window.location.reload();
}

if(document.getElementById('login-form')) {
    if(isConnected()) {
        window.location.href = './index.html';
    } else {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();

            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            let body = {'email': email, 'password': password};
            login(body);
        });
    }
}

async function login(values) {
    let login = await fetchApi(apiLogin, 'POST', 'application/json', JSON.stringify(values));

    if(login.status == 200) {
        localStorage.setItem('userId', login.data.userId);
        localStorage.setItem('token', login.data.token);
        window.location.href = './index.html';

    } else if(login.status > 400) {
        alerts('error', 'E-mail ou mot de passe incorrect. Vérifiez votre saisie.');
    }
}