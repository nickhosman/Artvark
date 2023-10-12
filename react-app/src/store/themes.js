const LOAD_THEME = "themes/LOAD_THEME";

export const loadTheme = (theme) => ({
  type: LOAD_THEME,
  payload: theme,
});

const initialState = {};
const themeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_THEME:
      newState = {
        ...action.payload
      };
      return newState;
    default:
      return state;
  }
};

export default themeReducer;
