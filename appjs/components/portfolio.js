import { fetchApi } from "../utils/fetch.js";
import { deleteProject } from "../admin/portfolio.js";

export async function displayAdminPortfolio() {
    let works = await fetchApi(apiWorks, 'GET');
    let project = '';
    let el = document.querySelector('.modal-galery');
    el.innerHTML = '';

    works.data.forEach((item) => {
        if(deleteList.find(el => el == item.id) == undefined) {
            project = createAdminItem(item);
            el.append(project)
        }  
    })

    createList.forEach((item)=> {
        project = createAdminItem(item, 't');
        el.append(project)
    });
}

export async function displayPortfolio(catId = 0) {
    let works = await fetchApi(apiWorks, 'GET');
    let figure = '';

    works.data.forEach((item) => {
        if(catId == 0 || item.categoryId == catId) {
            createItem(item);
        } 
    })
}

export function createItem(item, tid = '') {
    let gallery = document.querySelector('.gallery');
    let figure = document.createElement('figure');
    figure.id = tid+item.id;

    let img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;

    let figcaption = document.createElement('figcaption');
    figcaption.innerText = item.title;

    figure.append(img, figcaption);
    gallery.append(figure);
}

function createAdminItem(item, tid = '') {
    let galeryItems = document.createElement('div');
    galeryItems.className = 'galery-items';

    let option = document.createElement('div');
    option.className = 'option';
    option.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';

    let del = document.createElement('i');
    del.className = 'fa-solid fa-trash-can';
    del.setAttribute('data-id', tid+item.id);
    del.setAttribute('data-name', item.title);
    del.addEventListener('click', function() {
        deleteProject(this);
    });

    let img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;

    let p = document.createElement('p').textContent = 'éditer';
    option.append(del);
    galeryItems.append(option, img, p);

    return galeryItems;
}