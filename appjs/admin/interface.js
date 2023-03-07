import { logout } from "../components/login.js";
import { newModal } from "../modals/modals.js";
import { saveChanges } from "./portfolio.js";

export default function displayAdminInterface() {
    // Navbar Admin
    let header = document.querySelector('header');
    let navbar = document.createElement('div');
    let btnSave = document.createElement('button');

    navbar.className = 'admin-navbar';
    navbar.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>';

    btnSave.className = 'admin-save';
    btnSave.innerText = 'publier les changements';

    navbar.append(btnSave);
    header.parentNode.insertBefore(navbar, header);

    btnSave.addEventListener('click', function() { saveChanges() });

    // Login => Logout
    let login = document.querySelectorAll('nav ul li')[2];
    login.innerHTML = 'logout';
    login.addEventListener("click", logout);

    // Affichage "modifier"
    let change = document.createElement('p');
    change.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
    change.className = 'admin-change';

    let changePlace = document.querySelector('section#portfolio .projects');
    changePlace.append(change);

    change.addEventListener('click', function() { newModal(0); });
}