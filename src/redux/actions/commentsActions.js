import { commentsAPI } from "../../axios/comments";

const actionsComments = {
  createComment: (payload) => ({ type: "comments/CREATE_COMMENT", payload }),
  addComment: (payload) => ({ type: "comments/ADD_COMMENT", payload }),
  getComments: (payload) => ({ type: "comments/GET_COMMENTS", payload }),
  getUsersComments: (payload) => ({
    type: "comments/GET_USER_COMMENTS",
    payload,
  }),
  getComment: (payload) => ({ type: "comments/GET_COMMENT", payload }),
  editComment: (payload) => ({ type: "comments/EDIT_COMMENT", payload }),
  getError: (payload) => ({ type: "comments/GET_ERROR", payload }),
  toggleMessage: (payload) => ({
    type: "comments/TOGGLE_INFO_MESSAGE",
    payload,
  }),
  toggleStatus: (payload) => ({ type: "comments/TOGGLE_STATUS", payload }),
};

export const getAllCommentsOfPost = (postId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await commentsAPI.allCommentsForPost(postId);
      if (status === 200) {
        dispatch(actionsComments.getComments(data));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const getAllComments = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await commentsAPI.getAllComments();
      if (status === 200) {
        dispatch(actionsComments.getComments(data));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const uploadComment = (comment, postId) => {
  return async (dispatch) => {
    try {
      const { status } = await commentsAPI.createComment(comment);
      if (status === 201) {
        dispatch(actionsComments.toggleMessage("Запись добавлена"));
        dispatch(getAllCommentsOfPost(postId));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const getOnlyUsersComments = (userId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await commentsAPI.getOnlyUsersComments(userId);
      if (status === 200) {
        dispatch(actionsComments.getUsersComments(data));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const editComment = (id, text, postId, userId) => {
  return async (dispatch) => {
    try {
      const { status } = await commentsAPI.editComment(id, text);
      if (status === 202) {
        dispatch(getAllCommentsOfPost(postId));
        dispatch(getOnlyUsersComments(userId));
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};

export const deleteComment = (id, postId, userId) => {
  return async (dispatch) => {
    try {
      const { status } = await commentsAPI.deleteComment(id);
      if (status === 202) {
        dispatch(getAllCommentsOfPost(postId));
        dispatch(getOnlyUsersComments(userId));
      } else if (status === 403) {
        dispatch(
          actionsComments.toggleMessage("У вас нет доступа к этой записи")
        );
      }
    } catch (error) {
      dispatch(actionsComments.getError(error.response.data.message));
    }
  };
};
