import {
    readPoststringComponent,
    getImageBlobURL,
    getPreviewImageComponent,
    incrementCounter,
    getPostId,
    removePostCard,
    getPostElementComponent,
    fillForm
} from "/public/scripts/helpers.js"

import {
    readPosts,
    createPost,
    likePost,
    dislikePost,
    deletePost,
    updatePost
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
    updatePostForm,
    cancelEditButton
} from "/public/scripts/elements.js"

// GET AND DISPLAY ALL THE POSTS
const posts = [
    { id: 1, description: "Hello world" },
    { id: 2, description: "Thug life" },
    { id: 3, description: "World Wide MOB figgaz" },
    { id: 4, description: "It's just me against the world" },
];

if (timeline) {
    readPosts().then((posts) => {
        let postsComponentsString = posts.map((post) => {
            return readPoststringComponent(post)
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


// CLICK EVENT DELEGATION
let postToEdit = null;

timeline.addEventListener("click", async function (event) {
    const element = event.target;

    // LIKE THE POST   
    if (element.id == "like") {
        event.preventDefault(getPostId(element.id))
        let liked = await likePost();
        if (liked) {
            let counter = element.querySelector("#count__likes");
            incrementCounter(counter)
        }
    }
    // DISLIKE THE POST  
    else if (element.id == "dislike") {
        event.preventDefault()
        let disliked = await dislikePost(getPostId(element.id));
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
            fillForm(postToEdit)

            // Show the form to edit the post
            updatePostForm.classList.add("show")
        }

        postToEdit = null;
    }
}, true)

// CLICK EVENT DELEGATION
document.body.addEventListener("dblclick", function (event) {

    const element = event.target;

    if (element.nodeName === "IMG" && element.closest("#preview__media")) {
        // Remove the element from the DOM
        element.remove();

        // Remove the element from the list of files
        // Maybe delete it from the backend too

    }
})

// EDIT A POST
if (updatePostForm) {
    updatePostForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const editedPost = await updatePost(postToEdit.id, formData)

        if (editedPost) {
            // Hide the edit form
            updatePostForm.classList.remove("show")

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
        updatePostForm.classList.remove("show")
        postToEdit = null
    })
}