globalThis.apiLogin = 'http://localhost:5678/api/users/login';
globalThis.apiWorks = 'http://localhost:5678/api/works';
globalThis.apiCategories = 'http://localhost:5678/api/categories';

export async function fetchApi(src, action, content = null, value = null, token = null, returnJson = true) {
    let fetchStatus = '';
    let fetchData = '';

    let settings = {
        method: action,
        headers: {
            
        },
    };

    token != null ? settings.headers["Authorization"] = 'Bearer '+token : null
    content != null ? settings.headers["Content-Type"] = content : null 
    value != null ? settings["body"] = value : null
    
    await fetch(src, settings)
        .then(res => {
            fetchStatus = res.status;
            if(returnJson) {
                return res.json();
            }
        })
        .then(data => fetchData = data)
    
    let response = [{'status': fetchStatus, 'data': fetchData}];
    return response[0];
}