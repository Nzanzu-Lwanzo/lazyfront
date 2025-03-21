
export function getPostStringComponent(post) {
    return `
    <div class="post shadow" id="xxx-postcard-${post.id}">
        <div class="post__card__topbar">
            <div class="profile">
                <div class="profile__image">
                    <img src="/public/imgs/profile.jpg" alt="Profile image">
                </div>
                <div class="profile__infos">
                    <p class="profile__name">John Doe</p>
                </div>
            </div>
            <div class="buttons__row">
                <button type="button" class="button__on__white" id="xxx-delete-${post.id}">Delete</button>
                <button type="button" class="button__on__white" id="xxx-edit-${post.id}">Edit</button>
            </div>
        </div>
        <div class="post__text__content">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure ducimus voluptatum laboriosam sit magni laudantium quibusdam excepturi minima, ipsam amet quis ullam nesciunt nam atque ab, rem illo dolorum eum!
            </p>
        </div>
        <div class="post__images count__2">
            <img src="/public/imgs/profile.jpg" alt="Post image">
            <img src="/public/imgs/profile.jpg" alt="Post image">
        </div>
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
    div.classList.add("shadow","post");

    const innerHTML = `
    <div class="post__card__topbar">
        <div class="profile">
            <div class="profile__image">
                <img src="/public/imgs/profile.jpg" alt="Profile image">
            </div>
            <div class="profile__infos">
                <p class="profile__name">John Doe</p>
            </div>
        </div>
        <div class="buttons__row">
            <button type="button" class="button__on__white" id="xxx-delete-${post.id}">Delete</button>
            <button type="button" class="button__on__white" id="xxx-edit-${post.id}">Edit</button>
        </div>
    </div>
    <div class="post__text__content">
        <p>
            Edited post (just to show you it works)
        </p>
    </div>
    <div class="post__images count__2">
        <img src="/public/imgs/profile.jpg" alt="Post image">
        <img src="/public/imgs/profile.jpg" alt="Post image">
    </div>
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

    return image;
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