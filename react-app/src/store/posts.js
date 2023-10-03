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
