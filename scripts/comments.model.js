class CommentsModel {
    apiUrl3 = 'http://jsonplaceholder.typicode.com/posts/';
    
    getAllComments() {
        return this.getCommentForPost();
    }

    getCommentsById(id) {
        return this.getCommentForPost(id);
    }

    getCommentForPost(id) {
        return fetch(`${this.apiUrl3}${id}/comments`).then(res => res.json());
        // .then(console.log);
    }

    createComment(body, email, userId = 1) {
        const post = {
            body,
            email
        };

        return this.getApiData(userId, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(post)
        });
    }

    getApiData(id, options) {
        return fetch(this.apiUrl3 + id + "/comments", options).then(res => res.json());
    }
}





