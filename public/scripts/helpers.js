import { updatePostFormTextarea } from "./elements.js";

export function readPoststringComponent(post) {
    return `
    <div class="post shadow" id="xxx-postcard-${post.id}">
        <div class="post__card__topbar">
            <div class="profile">
                <div class="profile__image">
                    <img src="${post.author?.image}" alt="Profile image of ${post.author?.name}">
                </div>
                <div class="profile__infos">
                    <p class="profile__name">${post.author?.name}</p>
                </div>
            </div>
            <div class="buttons__row">
                <button type="button" class="button__on__white" id="xxx-delete-${post.id}">Delete</button>
                <button type="button" class="button__on__white" id="xxx-edit-${post.id}">Edit</button>
            </div>
        </div>
        <div class="post__text__content">
            <p>
                ${post.description}
            </p>
        </div>
        ${post.images ? `
            <div class="post__images ${post.images.length === 2 && "count__2"}">
                ${post.images.map((url) => {
                    return getPreviewImageComponent(url).outerHTML;
                }).join("")}
            </div>
        ` : ''}
        <div class="actions__on__post">
            <button type="button" id="like" class="button__on__white like__button">
                <span>Like<span/>
                <span id="count__likes">0<span/>
            </button>
            <button type="button" id="dislike" class="button__on__white dislike__button">
                <span>Dislike<span/>
                <span id="count__dislikes">0<span/>
            </button>
        </div>
    </div>
    `

}

export function getPostElementComponent(post) {

    const div = document.createElement("div")
    div.id = `xxx-postcard-${post.id}`
    div.classList.add("shadow", "post");

    const innerHTML = `
    <div class="post__card__topbar">
        <div class="profile">
            <div class="profile__image">
                <img src="${post.author?.image}" alt="Profile image of ${post.author?.name}">
            </div>
            <div class="profile__infos">
                <p class="profile__name">${post.author?.name}</p>
            </div>
        </div>
        <div class="buttons__row">
            <button type="button" class="button__on__white" id="xxx-delete-${post.id}">Delete</button>
            <button type="button" class="button__on__white" id="xxx-edit-${post.id}">Edit</button>
        </div>
    </div>
    <div class="post__text__content">
        <p>
            ${post.description}
        </p>
    </div>
    ${post.images ? `
        <div class="post__images ${post.images.length === 2 && "count__2"}">
            ${post.images.map((url) => {
                return getPreviewImageComponent(url).outerHTML;
            }).join("")}
        </div>
    ` : ''}
    <div class="actions__on__post">
        <button type="button" id="like" class="button__on__white like__button">
            <span>Like<span/>
            <span id="count__likes">0<span/>
        </button>
        <button type="button" id="dislike" class="button__on__white dislike__button">
            <span>Dislike<span/>
            <span id="count__dislikes">0<span/>
        </button>
    </div>
    `
    div.innerHTML = innerHTML;
    return div;
}

export function getImageBlobURL(imageFile) {
    const url = URL.createObjectURL(imageFile);
    return url;
}

export function getPreviewImageComponent(url) {
    const image = document.createElement("img")
    image.src = url;

    return image
}

export function incrementCounter(counter) {
    let count = parseInt(counter.innerHTML);
    counter.innerHTML = count + 1;
}

/**
 * 
 * @param {string} id_string 
 * 
 * The id is the third element of the array.
 * The structure of the string if xxx-(action)-(id).
 */
export function getPostId(id_string) {
    let arr = id_string.split("-");
    return arr[2]
}

export function removePostCard(id) {
    document.getElementById(`xxx-postcard-${id}`).remove()
}

export function fillForm(post) {

    updatePostFormTextarea.value = post.description;

    // Display the images too

}