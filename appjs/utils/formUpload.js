import { fetchApi } from "./fetch.js";
import { importFile } from "../modals/modals.js";

export default async function formUpload() {
    let form = document.createElement('form');
    form.id = 'add-form';

    let modalSeparator = document.createElement('span')
    modalSeparator.className = 'separator';

    let modalImg = document.createElement('div')
    modalImg.className = 'img-content';

    let modalIcon = document.createElement('i')
    modalIcon.className = 'fa-regular fa-image file';

    let inputFile = document.createElement('input')
    inputFile.type = 'file';
    inputFile.name = 'image';
    inputFile.id = 'image';
    inputFile.required = true;

    inputFile.addEventListener('change', function() {
        importFile(this.files[0]);
    });

    let inputLabel = document.createElement('label')
    inputLabel.textContent = '+ Ajouter photo';
    inputLabel.setAttribute('for', 'image')

    let modalP = document.createElement('p')
    modalP.textContent = 'jpg, png: 4mo max';
    modalImg.append(modalIcon, inputLabel, inputFile, modalP);
    

    let titleLabel = document.createElement('label')
    titleLabel.textContent = 'Titre';
    titleLabel.setAttribute('for', 'title');

    let titleInput = document.createElement('input')
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;

    let categoryLabel = document.createElement('label')
    categoryLabel.textContent = 'Catégorie';
    categoryLabel.setAttribute('for', 'category');

    let categoryInput = document.createElement('select')
    categoryInput.id = 'category';
    categoryInput.name = 'category';
    categoryInput.required = true;

    let cat = await fetchApi(apiCategories, 'GET');
    let option = '';
    cat.data.forEach((item) => {
        option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        categoryInput.append(option);
    })

    let separator = document.createElement('span');
    separator.className = 'separator'

    let submitBtn = document.createElement('button')
    submitBtn.id = 'add-form-submit';
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Valider';

    form.append(modalImg, titleLabel, titleInput, categoryLabel, categoryInput, separator, submitBtn);
    return form;
}