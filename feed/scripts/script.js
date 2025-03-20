import {
    getPostComponent,
    getImageBlobURL,
    getPreviewImageComponent,
} from "/public/scripts/helpers.js"

import { getPosts, createPost } from "/public/scripts/api.js"
import {
    timeline,
    createPostForm,
    pickMediaButton,
    pickMediaInput,
    mediaPreviewer,
    sideMenuContainer,
    toggleMobileMenu,
    creationFormContainer,
    toggleMobileCreateForm
} from "/public/scripts/elements.js"

// GET AND DISPLAY ALL THE POSTS
if (timeline) {
    getPosts().then((posts) => {
        let postsComponentsString = posts.map((post) => {
            return getPostComponent(post)
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
if(toggleMobileMenu && sideMenuContainer) {
    toggleMobileMenu.addEventListener("click",function(){
        sideMenuContainer.classList.toggle("show")
    })
}

if(toggleMobileCreateForm && creationFormContainer) {
    toggleMobileCreateForm.addEventListener("click",function(){
        creationFormContainer.classList.toggle("show")
    })
}