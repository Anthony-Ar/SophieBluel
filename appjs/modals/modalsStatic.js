import { displayAdminPortfolio } from "../components/portfolio.js";
import { createProject } from "../admin/portfolio.js";
import formUpload from "../utils/formUpload.js";
import { closeModal, newModal } from "./modals.js";

function setModal(type, content) {
    let modal = document.createElement('div')
    modal.id = 'modal';
    let modalBody = document.createElement('div')
    modalBody.className = 'modal-body';
    let close = document.createElement('i')
    close.className= 'fa-solid fa-xmark close';
    let previous = document.createElement('i')
    previous.className = 'fa-solid fa-arrow-left back';
    
    close.addEventListener('click', closeModal);
    previous.addEventListener('click', function() { newModal(0) });
    window.onclick = function(e) {
        if (e.target.contains(modalBody) && e.target !== modalBody) {
            closeModal();
        } 
    }

    modal.append(modalBody);
    type == 0 ? modalBody.append(close, content) : modalBody.append(close, previous, content)
    return modal;
}

export async function adminModal() {
    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content';
    let modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Galerie photo';
    let modalGalery = document.createElement('div')
    modalGalery.className = 'modal-galery';
    let modalSeparator = document.createElement('span')
    modalSeparator.className = 'separator';
    let modalBtn = document.createElement('button')
    modalBtn.className = 'add-btn';
    modalBtn.textContent = '+ Ajouter une photo';
    let modalDel = document.createElement('a');
    modalDel.className = 'delete-all';
    modalDel.href = '#';
    modalDel.textContent = 'Supprimer la galerie';

    modalBtn.addEventListener('click', function() { newModal(1); });

    modalContent.append(modalTitle, modalGalery, modalSeparator, modalBtn, modalDel);
    let modal = setModal(0, modalContent);

    document.body.appendChild(modal);
    await displayAdminPortfolio();
}

export async function uploadModal() {
    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content';
    let modalTitle = document.createElement('h3')
    modalTitle.textContent = 'Ajout photo';
    
    let form = await formUpload();
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        createProject(form.children[2].value, form.children[4].value);
    })
    
    modalContent.append(modalTitle, form);
    let modal = setModal(1, modalContent);

    document.body.appendChild(modal);
}