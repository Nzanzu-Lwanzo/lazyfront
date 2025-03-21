import {
    getPostStringComponent,
    getImageBlobURL,
    getPreviewImageComponent,
    incrementCounter,
    getPostId,
    removePostCard,
    getPostElementComponent
} from "/public/scripts/helpers.js"

import {
    getPosts,
    createPost,
    likePost,
    dislikePost,
    deletePost,
    editPost
} from "/public/scripts/api.js"
import {
    timeline,
    createPostForm,
    pickMediaButton,
    pickMediaInput,
    mediaPreviewer,
    sideMenuContainer,
    toggleMobileMenu,
    creationFormContainer,
    toggleMobileCreateForm,
    editPostForm,
    cancelEditButton
} from "/public/scripts/elements.js"

// GET AND DISPLAY ALL THE POSTS
const posts = [
    { id: 1, title: "Hello world" },
    { id: 2, title: "Thug life" },
    { id: 3, title: "World Wide MOB figgaz" },
    { id: 4, title: "It's just me against the world" },
];

if (timeline) {
    getPosts().then((posts) => {
        let postsComponentsString = posts.map((post) => {
            return getPostStringComponent(post)
        })

        timeline.innerHTML += postsComponentsString.join("");
    })
}

// CHOOSE MEDIAS
if (pickMediaInput && pickMediaButton) {
    pickMediaButton.addEventListener("click", () => {
        pickMediaInput.click()
    })
}

// DISPLAY THE CHOSEN MEDIAS
pickMediaInput.addEventListener("change", function (e) {
    const files = e.target.files;
    for (let file of files) {
        let url = getImageBlobURL(file);
        let image = getPreviewImageComponent(url)
        mediaPreviewer.appendChild(image)
    }
})

// SEND THE DATA
if (createPostForm) {
    createPostForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let sent = await createPost(formData)

        // When the data is sent, do this
        if (sent) {
            e.currentTarget.reset()
        }
    })
}

// ON MOBILE SHOW MENU
if (toggleMobileMenu && sideMenuContainer) {
    toggleMobileMenu.addEventListener("click", function () {
        sideMenuContainer.classList.toggle("show")
    })
}

if (toggleMobileCreateForm && creationFormContainer) {
    toggleMobileCreateForm.addEventListener("click", function () {
        creationFormContainer.classList.toggle("show")
    })
}


let postToEdit = null;

timeline.addEventListener("click", async function (event) {
    const element = event.target;

    // LIKE THE POST   
    if (element.id == "like") {
        event.preventDefault()
        let liked = await likePost();
        if (liked) {
            let counter = element.querySelector("#count__likes");
            incrementCounter(counter)
        }
    }
    // DISLIKE THE POST  
    else if (element.id == "dislike") {
        event.preventDefault()
        let disliked = await dislikePost();
        if (disliked) {
            let counter = element.querySelector("#count__dislikes");
            incrementCounter(counter)
        }
    }
    // DELETE THE POST  
    else if (element.id.startsWith("xxx-delete-")) {
        let id = getPostId(element.id)
        let deleted = await deletePost(id)

        if (deleted) {
            removePostCard(id)
        }

    }
    // EDIT THE POST 
    else if (element.id.startsWith("xxx-edit-")) {

        // Get the post to edit and save it
        let id = getPostId(element.id)
        postToEdit = posts.find((post) => {
            return post.id === id * 1
        })

        if (postToEdit) {
            // Fill the inputs with the values of the post to edit
            

            // Show the form to edit the post
            editPostForm.classList.add("show")
        }
    }
}, true)

// EDIT A POST
if (editPostForm) {
    editPostForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const editedPost = await editPost(formData)

        if (editPost) {
            // Hide the edit form
            editPostForm.classList.remove("show")

            // Replace the old post card by a newer
            const newPostElement = getPostElementComponent({ id: 12 });
            document
                .getElementById(`xxx-postcard-${postToEdit.id}`)
                .replaceWith(newPostElement)

            // Reset the variable that holds the post to edit to be null
            postToEdit = null
        }
    })
}

// CANCEL EDITION
if (cancelEditButton) {
    cancelEditButton.addEventListener("click", function () {
        editPostForm.classList.remove("show")
        postToEdit = null
    })
}