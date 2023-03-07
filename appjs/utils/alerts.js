export default async function alerts(type, text, time = 2500) {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let alert = addAlert(type, text);
    alert.addEventListener('click', function() { this.remove(); });

    await delay(time);
    alert.style.animation = 'alerts 1.1s';
    await delay(1000);
    alert.remove();
}

function getIcon(type) {
    switch(type) {
        case 'error': return '<i class="fa-solid fa-circle-exclamation"></i>'; break;
        case 'warn': return '<i class="fa-solid fa-triangle-exclamation"></i>'; break;
        case 'info': return '<i class="fa-solid fa-circle-info"></i>'; break;
        case 'success': return '<i class="fa-solid fa-circle-check"></i>'; break;
        default: break;
    };
}

function addAlert(type, text) {
    let alertDiv = document.createElement('div');
    alertDiv.className = 'alerts';
    alertDiv.classList.add(type);

    alertDiv.innerHTML = getIcon(type) + '<p>'+text+'</p>';

    if(!document.getElementById('alerts-group')) {
        let header = document.querySelector('header');
        let alertGroup = document.createElement('div');
        alertGroup.id = 'alerts-group';
        header.parentNode.insertBefore(alertGroup, header);
    }

    document.getElementById('alerts-group').append(alertDiv);

    return alertDiv;
}