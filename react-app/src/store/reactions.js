const LOAD_REACTIONS = "reactions/LOAD_REACTIONS"
const CLEAR_REACTIONS = "reactions/CLEAR_REACTIONS"
const ADD_REACTION = "reactions/ADD_REACTIONS"

const loadReactions = (reactions) => ({
  type: LOAD_REACTIONS,
  payload: reactions,
});

export const clearReactions = () => ({
  type: CLEAR_REACTIONS,
})
// const addReaction = (reaction) => ({
//   type: ADD_REACTION,
//   payload: reaction,
// })

export const fetchLoadReactions = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/reactions`)

  if (response.ok) {
    const reactions = await response.json();
    await dispatch(loadReactions(reactions));
    return reactions;
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const fetchAddReaction = (postId, reaction) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/reactions`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(reaction)
  })

  if (response.ok) {
    const newReaction = await response.json()
    dispatch(fetchLoadReactions(postId))
    return newReaction
  } else {
    const errors = await response.json()
    console.log(errors)
    return errors;
  }
}

const initialState = {};
const reactionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REACTIONS:
      newState = {
        ...action.payload,
      };
      return newState;
    case CLEAR_REACTIONS:
      newState = {};
      return newState;
    case ADD_REACTION:
      newState = {
        ...state,
        ...action.payload
      };
      return newState;
    default:
      return state;
  }
};

export default reactionReducer
