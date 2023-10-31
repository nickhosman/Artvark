const LOAD_POSTS = "posts/LOAD_POSTS";
const DELETE_POST = "posts/DELETE_POST";
const CLEAR_POSTS = "posts/CLEAR_POSTS";

const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    payload: posts,
});

const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId,
});

export const clearPosts = () => ({
    type: CLEAR_POSTS,
});

export const fetchLoadPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts");

    if (response.ok) {
        // console.log("RESPONSE OK")
        const posts = await response.json();
        await dispatch(loadPosts(posts));
        return posts;
    } else {
        // console.log("ERRORS")
        const errors = await response.json();
        return errors;
    }
};

export const fetchLoadLikedPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/liked");

    if (response.ok) {
        const posts = await response.json();
        await dispatch(loadPosts(posts));
        return posts;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const fetchLoadUserPosts = (userId) => async (dispatch) => {
    const response = await fetch(`/api/posts/users/${userId}`);

    if (response.ok) {
        const posts = await response.json();
        await dispatch(loadPosts(posts));
        return posts;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const fetchLoadFollowedPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/following");

    if (response.ok) {
        const posts = await response.json();
        await dispatch(loadPosts(posts));
        return posts;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const fetchCreatePost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts/new", {
        method: "POST",
        body: post,
    });

    if (response.ok) {
        const resPost = await response.json();
        // console.log("RESPOST:", resPost)

        // for (let image of images) {
        //     console.log("IMAGES:", images)
        //     const imageFormData = new FormData()
        //     imageFormData.append("image", image)

        //     console.log("IMAGE FORM DATA:", imageFormData)

        //     let imageResponse = await fetch(`/api/posts/${resPost.id}/images`, {
        //         method: "POST",
        //         body: imageFormData,
        //     })

        //     if (!imageResponse.ok) {
        //         const error = await imageResponse.json()
        //         console.log("IMAGE ERROR", error)
        //         return error;
        //     }
        // }

        dispatch(fetchLoadPosts());
        return resPost;
    } else {
        const errors = response.json();
        return errors;
    }
};

export const fetchDeletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });

    if (response.ok) {
        // const message = await response.json();
        //   console.log("MESSAGE:", message)
        dispatch(deletePost(postId));
    }
};

const initialState = {};
const postReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POSTS:
            newState = {
                ...action.payload,
            };
            return newState;
        case DELETE_POST:
            newState = {
                ...state,
            };
            delete newState[action.payload];
            return newState;
        case CLEAR_POSTS:
            newState = initialState;
            return newState;
        default:
            return state;
    }
};

export default postReducer;
