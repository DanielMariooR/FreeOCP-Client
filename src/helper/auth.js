export function setAuthHeader(){
    const user = JSON.parse(localStorage.getItem('user-info'));

    if (user && user.token) {
        return {'Authorization': 'Bearer ' + user.token, 'Content-Type': 'application/json'};
    } else {
        return {'Content-Type': 'application/json'};
    }
}

export function checkAuth(){
    const user = JSON.parse(localStorage.getItem('user-info'));
    if (user && user.token) {
        var expiresAt = new Date(user.expiration)
        var now = new Date()
        if (expiresAt <= now){
            return false
        }
        return true;
    } else {
        return false;
    }
}

