const initialState = {
  postsData: [],
  postData: null,
  usersPostsData: [],
  error: null,
  message: null,
  images: [],
  totalPostsNumber: 0,
  searchResponseData: [],
  isLoadingPost: false,
  isLoadingAllPosts: false,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "posts/GET_POSTS":
      return {
        ...state,
        postsData: action.payload,
      };
    case "posts/CREATE_POST":
      return {
        ...state,
        postData: action.payload,
      };
    case "posts/GET_TOTAL_NUMBER":
      return {
        ...state,
        totalPostsNumber: action.payload,
      };
    case "posts/GET_POST":
      return {
        ...state,
        postData: action.payload,
      };
    case "posts/GET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "posts/TOGGLE_INFO_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "posts/TOGGLE_PAGE":
      return {
        ...state,
        postsData: action.payload.items,
      };
    case "posts/GET_RESPONSE":
      return {
        ...state,
        searchResponseData: action.payload,
      };
    case "posts/GET_USERS_POSTS":
      return {
        ...state,
        usersPostsData: action.payload,
      };
    case "posts/TOGGLE_LOADING_POST":
      return {
        ...state,
        isLoadingPost: action.payload,
      };
    case "posts/TOGGLE_LOADING_POSTS":
      return {
        ...state,
        isLoadingAllPosts: action.payload,
      };
    default:
      return state;
  }
};
