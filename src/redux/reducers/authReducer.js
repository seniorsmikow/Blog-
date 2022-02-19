const initialState = {
  isAuth: false,
  userData: null,
  userId: null,
  profileData: null,
  error: null,
  message: null,
  showAlert: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth/LOGIN":
      return {
        ...state,
        userData: action.payload,
        isAuth: true,
        showAlert: true,
      };
    case "auth/GET_ERROR":
      return {
        ...state,
        error: action.payload,
        showAlert: true,
      };
    case "auth/REGISTRATION":
      return {
        ...state,
        userData: action.payload,
        isAuth: true,
        showAlert: true,
      };
    case "auth/TOGGLE_INFO_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "auth/LOGOUT":
      return {
        ...state,
        isAuth: false,
        userData: null,
        userId: null,
      };
    case "auth/REMOVE_MESSAGES": {
      return {
        ...state,
        error: null,
        message: null,
      };
    }
    case "auth/GET_USER": {
      return {
        ...state,
        userData: action.payload,
        userId: action.payload._id,
        isAuth: true,
      };
    }
    case "autn/TOGGLE_ALERT":
      return {
        ...state,
        showAlert: action.payload,
      };
    default:
      return state;
  }
};
