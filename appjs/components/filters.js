import { displayPortfolio } from "./portfolio.js";
import { fetchApi } from "../utils/fetch.js";

export async function displayFilters() {
    let works = await fetchApi(apiWorks, 'GET');

    let filtersList = new Map();

    filtersList.set(0, 'Tous');
    for(let i = 0; i < works.data.length; i++) {
       filtersList.set(works.data[i].categoryId, works.data[i].category.name);
    }
    filtersList = Array.from(filtersList);

    createFilters(filtersList);
}

function setActive(el) {
    document.querySelector('.category li.active').classList.remove('active');
    el.classList.add('active');
    displayPortfolio(el.getAttribute('data-id'))
}

function createFilters(list) {
    let li = [];

    list.forEach((item) => {
        li = document.createElement('li');
        li.innerText = item[1];
        li.setAttribute('data-id', item[0]);

        li.addEventListener('click', function() { setActive(this); });

        document.querySelector('.category').append(li);

        item[0] == 0 ? li.className = 'active' : null
    })
}