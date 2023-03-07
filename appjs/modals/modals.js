import { adminModal, uploadModal } from "./modalsStatic.js";

globalThis.currentFile = '';

export function modal() {
    if(document.getElementById('modal')) {
        return true;
    } else {
        return false;
    }
}

export async function newModal(type = 0) {
    modal() ? closeModal() : null
    type == 0 ? await adminModal() : await uploadModal()
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    document.getElementById('modal').remove();
    document.body.style.overflow = 'auto';
}

export function importFile(file) {
    if(file.type == 'image/jpeg' || file.type == 'image/png') {
        if(file.size / 1024 ** 2 <= 4) {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                let image= new Image();
                image.src=e.target.result;
                image.onload = function () {
                    document.querySelector('.img-content').innerHTML = '<img src="'+image.src+'" alt="Image téléchargée">';
                    currentFile = {'imgSrc': image.src, 'file': file};
                };
            }
        } else { alerts('warn', 'Le fichier sélectionné est trop volumineux. (max : 4mo)'); }
    } else { alerts('warn', 'Le fichier sélectionné n\'est pas au bon format. (acceptés : .jpg, .png)'); }
}
