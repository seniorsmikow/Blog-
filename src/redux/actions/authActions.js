import { authAPI } from "../../axios/auth";
import { usersAPI } from "../../axios/users";

const actionsAuth = {
  login: (payload) => ({ type: "auth/LOGIN", payload }),
  logout: () => ({ type: "auth/LOGOUT" }),
  registration: (payload) => ({ type: "auth/REGISTRATION", payload }),
  getError: (payload) => ({ type: "auth/GET_ERROR", payload }),
  toggleMessage: (payload) => ({ type: "auth/TOGGLE_INFO_MESSAGE", payload }),
  removeMesages: () => ({ type: "auth/REMOVE_MESSAGES" }),
  getUser: (payload) => ({ type: "auth/GET_USER", payload }),
  toggleShowAlert: (payload) => ({ type: "autn/TOGGLE_ALERT", payload }),
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await usersAPI.getUserData(userId);
      if (status === 200) {
        dispatch(actionsAuth.getUser(data));
      }
    } catch (error) {
      dispatch(actionsAuth.toggleShowAlert(true));
      dispatch(actionsAuth.getError(error.response.data.message));
    }
  };
};

export const userLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const { data, status } = await authAPI.login(email, password);
      if (status === 200) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Добро пожаловать!"));
        dispatch(actionsAuth.login(data));
        // dispatch(getUser(data._id));
        dispatch(checkUserAuth(data._id));
        localStorage.setItem("tokenBlog", data.token);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Неверный логин или пароль"));
      } else {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage(error.response.data.message));
      }
    }
  };
};

export const userRegistration = (fullName, email, password) => {
  return async (dispatch) => {
    try {
      const { data, status } = await authAPI.registration(
        fullName,
        email,
        password
      );
      if (status === 201) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Вы зарегестрировались на сайте!"));
        dispatch(actionsAuth.registration(data));
        // dispatch(getUser(data._id));
        dispatch(checkUserAuth(data._id));
        localStorage.setItem("tokenBlog", data.token);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(
          actionsAuth.toggleMessage(
            "Пользователь с такой почтой уже зарегистрирован"
          )
        );
      } else {
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage(error.response.data.message));
      }
    }
  };
};

export const userLogout = () => {
  return (dispatch) => {
    try {
      dispatch(actionsAuth.logout());
      localStorage.removeItem("tokenBlog");
    } catch (error) {
      dispatch(actionsAuth.getError(error.response.data.message));
    }
  };
};

export const checkUserAuth = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await authAPI.checkAuth();
      if (status === 200) {
        dispatch(getUser(data._id));
        dispatch(actionsAuth.toggleShowAlert(true));
        dispatch(actionsAuth.toggleMessage("Мы рады, что вы снова с нами!"));
      }
    } catch (error) {
      dispatch(actionsAuth.toggleShowAlert(true));
      dispatch(actionsAuth.toggleMessage("Вы не авторизованы"));
    }
  };
};

export const closeInfoAlert = () => {
  return (dispatch) => {
    dispatch(actionsAuth.toggleShowAlert(false));
  };
};

export const removeAlertMessages = () => {
  return (dispatch) => {
    dispatch(actionsAuth.removeMesages());
  };
};
