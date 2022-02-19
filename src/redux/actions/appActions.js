const actionsApp = {
  active: (payload) => ({ type: "app/TOGGLE_ACTIVE", payload }),
};

export const toggleActive = (open) => {
  return (dispatch) => {
    dispatch(actionsApp.active(open));
  };
};
