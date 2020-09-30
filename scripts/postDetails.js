class PostDetailsView {
    postsModel = new PostsModel();
    usersModel = new UsersModel();
    commentsModel = new CommentsModel();

    constructor() {
        const id = this.getPostId();
        const post = this.postsModel.getPostById(id);
        this.hidrateHtml(post);

        this.postComments = this.handleCommentFormSubmit;
        document.querySelector('[data-comment-form]').addEventListener('submit', (e) => this.postComments(e));
        // attach event listeners (submit event pentru adaugat comentarii)
    }

    getPostId() {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    }

    hidrateHtml(data) {
        data.then(post => {
            this.hidrateAuthor(post);
            this.hidrateComments(post);
            const titleElem = document.querySelector('[data-post="tile"]');
            const bodyElem = document.querySelector('[data-post="body"]');
            titleElem.innerText = post.title;
            bodyElem.innerText = post.body;
        })
    }

    hidrateAuthor(post) {
        const authorElem = document.querySelector('[data-post="author"]');
        this.usersModel.getUserById(post.userId).then(user => { authorElem.innerText = user.username });
    }

    hidrateComments(post) {
        const commentElem = document.querySelector('[data-post="comments"]');
        this.commentsModel.getCommentsById(post.id)
            .then(comments => {
                const fragment = document.createDocumentFragment();
                for (const comment of comments) {
                    const h = document.createElement('h5');
                    h.innerText = comment.email;
                    const p = document.createElement('p');
                    p.innerText = comment.body;
                    fragment.append(h, p);
                    //console.log(comment);
                }
                commentElem.append(fragment);
            });
    }

    handleCommentFormSubmit(e) {
        e.preventDefault();
        const dataInput = document.querySelector('[data-input]');
        const commentBody = document.querySelector('[data-textarea]');
        this.commentsModel.createComment(commentBody.value, dataInput.value).then(console.log);
    }
}

new PostDetailsView();