const initialState = {
  comments: [],
  commentData: null,
  usersCommentsData: [],
  error: null,
  message: null,
  statusCode: null,
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "comments/GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "comments/CREATE_COMMENT":
      return {
        ...state,
        commentData: action.payload,
      };
    case "comments/TOGGLE_STATUS":
      return {
        ...state,
        statusCode: action.payload,
      };
    case "comments/GET_USER_COMMENTS":
      return {
        ...state,
        usersCommentsData: action.payload,
      };
    default:
      return state;
  }
};
