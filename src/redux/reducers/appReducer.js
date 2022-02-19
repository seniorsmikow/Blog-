const initialState = {
  isActive: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "app/TOGGLE_ACTIVE":
      return {
        ...state,
        isActive: action.payload,
      };
    default:
      return state;
  }
};
