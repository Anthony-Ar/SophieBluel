import { logout } from "../components/login.js";
import { newModal } from "../modals/modals.js";
import { saveChanges } from "./portfolio.js";

export function countChanges() {
    document.querySelector('.counter-change').innerText = createList.length + deleteList.length;
}

export default function displayAdminInterface() {
    // Navbar Admin
    let header = document.querySelector('header');
    let navbar = document.createElement('div');
    let btnSave = document.createElement('button');
    let counterChange = document.createElement('span');

    navbar.className = 'admin-navbar';
    navbar.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>';

    btnSave.className = 'admin-save';
    btnSave.innerText = 'publier les changements';

    counterChange.className = 'counter-change';
    btnSave.append(counterChange);

    navbar.append(btnSave);
    header.parentNode.insertBefore(navbar, header);

    btnSave.addEventListener('click', saveChanges);
    countChanges();

    // Login => Logout
    let login = document.querySelectorAll('nav ul li')[2];
    login.innerHTML = 'logout';
    login.addEventListener('click', logout);

    // Affichage "modifier"
    let change = document.createElement('p');
    change.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
    change.className = 'admin-change';

    let changePlace = document.querySelector('section#portfolio .projects');
    changePlace.append(change);

    change.addEventListener('click', () => newModal(0));
}