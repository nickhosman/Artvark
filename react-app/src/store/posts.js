const LOAD_POSTS = "posts/LOAD_POSTS";
const DELETE_POST = "posts/DELETE_POST";

const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    payload: posts,
});

const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId,
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

export const fetchCreatePost = (post, images) => async (dispatch) => {
    const response = await fetch("/api/posts/new", {
        method: "POST",
        body: post,
    });

    if (response.ok) {
        const resPost = await response.json();
        // console.log("RESPOST:", resPost)

        const imageResponse = await fetch(`/api/posts/${resPost.id}/images`, {
            method: "POST",
            body: images,
        });

        if (imageResponse.ok) {
            dispatch(fetchLoadPosts());
            return resPost;
        } else {
            console.log("SOMETHING WRONG WITH IMAGES");
            console.log(imageResponse);
        }
    }
    return { errors: "There was an error making your post." };
};

export const fetchDeletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });

    if (response.ok) {
      const message = await response.json()
      console.log("MESSAGE:", message)
      dispatch(deletePost(postId));
    }
};

const initialState = {};
const postReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_POSTS:
            newState = {
                ...state,
                ...action.payload,
            };
            return newState;
        case DELETE_POST:
            newState = {
              ...state,
            }
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
};

export default postReducer;
