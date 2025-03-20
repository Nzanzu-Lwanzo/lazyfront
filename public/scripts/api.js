export async function getPosts() {

    return [2, 1, 3, 7]

}

export async function createPost(formData) {
    console.log(Object.fromEntries(formData))

    return true
}