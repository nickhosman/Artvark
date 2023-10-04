const LOAD_POSTS = "posts/LOAD_POSTS"
const CREATE_POST = "posts/CREATE_POST"

const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  payload: posts,
});

const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
})

export const fetchLoadPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");

  if (response.ok) {
    // console.log("RESPONSE OK")
    const posts = await response.json()
    await dispatch(loadPosts(posts))
    return posts
  } else {
    // console.log("ERRORS")
    const errors = await response.json()
    return errors;
  }
};

export const fetchCreatePost = (post, images) => async (dispatch) => {
  const response = await fetch("/api/posts/new", {
    method: "POST",
    body: post
  });

  if (response.ok) {
    const { resPost } = await response.json()
    dispatch(createPost(resPost));

    const imageResponse = await fetch(`/api/posts/${resPost.id}/images`, {
      method: "POST",
      body: images
    });

    if (imageResponse.ok) {
      return resPost
    } else {
      console.log("SOMETHING WRONG WITH IMAGES")
    }
  }

  return {"errors": "There was an error making your post."}
}

const initialState = {};
const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_POSTS:
      newState = {
        ...state,
        ...action.payload
      }
      return newState
    default:
      return state
  };
}

export default postReducer
