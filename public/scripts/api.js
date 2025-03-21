// CREATE
export async function createPost(formData) {
    /*
        This function should return a boolean value
    */

    return true
}

// READ
export async function readPosts() {

    /*
        The data returned from this function must be an array of objects
        with the following shape.

        {
            id:string | number,
            images:string[],
            description:string,
            author : {name:string,image:string}[]
        }
    */

    return []
}

// UPDATE
export async function updatePost(id, formData) {
    /*
      This function should return the updated post in its new version
    */

    return true
}

// DELETE
export async function deletePost(id) {
    /*
      This function should return a boolean value
    */

    return true
}

// *************************************************************************
export async function likePost(id) {
    /*
      This function should return a boolean value
    */

    return true
}

export async function dislikePost(id) {
    /*
      This function should return a boolean value
    */

    return true
}
