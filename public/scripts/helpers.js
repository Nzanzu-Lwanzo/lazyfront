
export function getPostComponent(post) {
    return `
    <div class="post shadow">
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
                <button type="button" class="button__on__white">Delete</button>
                <button type="button" class="button__on__white">Edit</button>
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
            <button type="button" id="like" class="button__on__white">Like</button>
            <button type="button" id="dislike" class="button__on__white">Dislike</button>
            <button type="button" id="comment" class="button__on__white">Comment</button>
        </div>
    </div>
    `

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