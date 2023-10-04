const LOAD_POSTS = "posts/LOAD_POSTS"

const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  payload: posts,
});


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
    const resPost = await response.json()
    // console.log("RESPOST:", resPost)

    const imageResponse = await fetch(`/api/posts/${resPost.id}/images`, {
      method: "POST",
      body: images
    });

    if (imageResponse.ok) {
      dispatch(fetchLoadPosts());
      return resPost
    } else {
      console.log("SOMETHING WRONG WITH IMAGES")
      console.log(imageResponse)
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
