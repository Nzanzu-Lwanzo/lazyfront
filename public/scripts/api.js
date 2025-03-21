export async function getPosts() {

    return [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]

}

export async function createPost(formData) {
    console.log(Object.fromEntries(formData))

    return true
}

export async function likePost() {
    return true
}

export async function dislikePost(params) {
    return true
}

export async function deletePost(id) {
    return true
}

export async function editPost(formData) {
    return true
}