import { postsAPI } from "../../axios/posts";

const actionsPosts = {
  createOnePost: (payload) => ({ type: "posts/CREATE_POST", payload }),
  getPosts: (payload) => ({ type: "posts/GET_POSTS", payload }),
  getPost: (payload) => ({ type: "posts/GET_POST", payload }),
  getTotalPostsNumber: (payload) => ({
    type: "posts/GET_TOTAL_NUMBER",
    payload,
  }),
  getError: (payload) => ({ type: "posts/GET_ERROR", payload }),
  toggleMessage: (payload) => ({ type: "posts/TOGGLE_INFO_MESSAGE", payload }),
  uploadImg: (payload) => ({ type: "posts/UPLOAD_IMAGE", payload }),
  changePage: (payload) => ({ type: "posts/TOGGLE_PAGE", payload }),
  getResponse: (payload) => ({ type: "posts/GET_RESPONSE", payload }),
  getUsersPosts: (payload) => ({ type: "posts/GET_USERS_POSTS", payload }),
  toggleLoading: (payload) => ({ type: "posts/TOGGLE_LOADING_POST", payload }),
  toggleLoadingAllPosts: (payload) => ({
    type: "posts/TOGGLE_LOADING_POSTS",
    payload,
  }),
};

export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(actionsPosts.toggleLoadingAllPosts(true));
      const { data, status } = await postsAPI.getAllPosts();
      if (status === 200) {
        dispatch(actionsPosts.getPosts(data.items));
        dispatch(actionsPosts.getTotalPostsNumber(data.total));
        dispatch(actionsPosts.toggleLoadingAllPosts(false));
      }
    } catch (error) {
      dispatch(actionsPosts.getError("Произошла ошибка"));
    } finally {
      dispatch(actionsPosts.toggleLoadingAllPosts(false));
    }
  };
};

export const getPost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(actionsPosts.toggleLoading(true));
      const { data, status } = await postsAPI.getPost(postId);
      if (status === 200) {
        dispatch(actionsPosts.getPost(data));
        dispatch(actionsPosts.toggleLoading(false));
      }
    } catch (error) {
      dispatch(actionsPosts.getError("Произошла ошибка"));
    } finally {
      dispatch(actionsPosts.toggleLoading(false));
    }
  };
};

export const uploadPost = (post) => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.createPost(post);
      if (status === 201) {
        dispatch(actionsPosts.toggleMessage("Запись добавлена"));
        dispatch(actionsPosts.createOnePost(data));
        dispatch(getAllPosts());
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const uploadImage = (formData) => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.uploadImg(formData);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const togglePage = (pageNumber) => {
  return async (dispatch) => {
    try {
      dispatch(actionsPosts.toggleLoading(true));
      const { data, status } = await postsAPI.getPage(pageNumber);
      if (status === 200) {
        dispatch(actionsPosts.changePage(data));
        dispatch(actionsPosts.toggleLoading(false));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    } finally {
      dispatch(actionsPosts.toggleLoading(false));
    }
  };
};

export const searchPost = (query) => {
  return async (dispatch) => {
    try {
      dispatch(actionsPosts.toggleLoading(true));
      const { data, status } = await postsAPI.search(query);
      if (status === 200) {
        dispatch(actionsPosts.getPosts(data.items));
        dispatch(actionsPosts.getResponse(data));
        dispatch(actionsPosts.toggleLoading(false));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    } finally {
      dispatch(actionsPosts.toggleLoading(false));
    }
  };
};

export const getOnlyUsersPosts = (userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await postsAPI.getOnlyUsersPosts(userId);
      if (status === 200) {
        dispatch(actionsPosts.getUsersPosts(data.items));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const { status } = await postsAPI.deletePost(postId);
      if (status === 202) {
        dispatch(getAllPosts());
        dispatch(actionsPosts.toggleMessage("Запись удалена"));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const editPost = (id, data) => {
  return async (dispatch) => {
    try {
      const { status } = await postsAPI.editPost(id, data);
      if (status === 202) {
        dispatch(getPost(id));
        dispatch(getAllPosts());
        dispatch(actionsPosts.toggleMessage("Запись обновлена"));
      }
    } catch (error) {
      dispatch(actionsPosts.getError(error.response.data.message));
    }
  };
};

export const toggleMessage = (message) => {
  return async (dispatch) => {
    dispatch(actionsPosts.toggleMessage(message));
  };
};
