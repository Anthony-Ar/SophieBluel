import { fetchApi } from "../utils/fetch.js";
import { modal, newModal } from "../modals/modals.js";
import { createItem } from "../components/portfolio.js";
import alerts from "../utils/alerts.js";

export function createProject(title, category) {
    if(currentFile != '') {
        let project = {'id': createList.length, 'title': title, 'category': category, 'imageUrl': currentFile.imgSrc, 'image': currentFile.file};
        createList.push(project);

        createItem(project, 't');
        alerts('success', 'Le projet "'+title+'" vient d\'être crée en mode édition.');

        currentFile = '';
        newModal(0);
    } else {
        alerts('warn', 'Vous devez d\'abord choisir une image à associer au projet.');
    }
}

export function deleteProject(el, tid = null) {
    let id = el.getAttribute('data-id');

    if(tid == null) {
        deleteList.push(id);
    } else {
        createList = createList.filter(del => del.id != tid);
    }
    
    modal() ? el.parentNode.parentNode.remove() : null
    document.getElementById(id).remove();
    
    alerts('success', 'Le projet "'+el.getAttribute('data-name')+'" vient d\'être supprimé en mode édition.');
}

export async function saveChanges() {
    if(createList.length > 0 || deleteList.length > 0) {
        if(createList.length > 0) {
            createList.forEach((item) => persistCreate(item));
            createList = [];
        }

        if(deleteList.length > 0) {
            deleteList.forEach((item) => persistDelete(item));
            deleteList = [];
        }
    } else { alerts('info', 'Il n\'y a aucune modification en attente.'); }
}

async function persistCreate(item) {
    let formData = new FormData();
    formData.append('image', item.image);
    formData.append('title', item.title);
    formData.append('category', item.category);

    let persist = await fetchApi(apiWorks, 'POST', null, formData, localStorage.getItem('token'));

    if(persist.status > 400) { alerts('error', 'Erreur lors de la publication du projet "'+item.title+'".'); }
    if(persist.status == 201) { alerts('success', 'Le projet "'+item.title+'" vient d\'être publié.'); }
}

async function persistDelete(item) {
    let persist = await fetchApi(apiWorks+'/'+item, 'DELETE', null, null, localStorage.getItem('token'), false);
    
    if(persist.status > 400) { alerts('error', 'Erreur lors de la tentative de suppression d\'un projet'); }
    if(persist.status == 204) { alerts('success', 'Un projet vient d\'être supprimé définitivement.'); }
}