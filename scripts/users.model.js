// MVC Model View Controller
class UsersModel {
    apiUrl2 = 'http://jsonplaceholder.typicode.com/users';

    getUserById(id) {
        return fetch(`${this.apiUrl2}/${id}`).then(res => res.json());
    }

    createUser(username) {
        const post = {
            username
        };
        return fetch(this.apiUrl2, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(post) 
        });
    }

    updateUser(id, post) {
        return fetch(`${this.apiUrl2}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(post)
        }); 
    }

}