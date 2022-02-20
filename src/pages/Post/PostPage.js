import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostData,
  getLoadingPost,
} from "../../redux/selectors/postsSelectors";
import { getUserData } from "../../redux/selectors/authSelectors";
import { useNavigate } from "react-router-dom";
import styles from "./PostPage.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";
import { formatDate } from "../../utils/formatDate";
import BackgroundImg from "../../img/400px-React-icon.svg.png";
import { WaitPost } from "../../components/Loaders/WaitPost";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ReactMarkdown from "react-markdown";

export const PostPage = () => {
  const postData = useSelector(getPostData);
  const { id } = useParams();
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingPost);
  const date = postData && formatDate(postData.updatedAt);
  const idUserOwnerPost = postData && postData.user._id;
  const userId = userData && userData._id;
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  const toggleActive = () => {
    if (idUserOwnerPost === userId) {
      navigation(`/edit/${id}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <WaitPost />
      ) : (
        <div className={styles.page__wrapper}>
          <div className={styles.page__header}>
            {postData && postData.photoUrl ? (
              <img src={`${postData.photoUrl}`} alt="cover" />
            ) : (
              <img src={BackgroundImg} alt="cover" />
            )}

            <div className={styles.page__header_info}>
              {idUserOwnerPost === userId && (
                <button onClick={toggleActive}>
                  <DriveFileRenameOutlineIcon />
                  редактировать
                </button>
              )}
              <div className={styles.page__header_time}>
                <time>{date}</time>
                <span>
                  <VisibilityIcon />
                  {postData && postData.views}
                </span>
              </div>
              <h1>{postData && postData.title}</h1>
            </div>
          </div>

          <div className={styles.post__text}>
            {postData && postData.description}
          </div>

          <div className={styles.post__description}>
            {postData && <ReactMarkdown>{postData.text}</ReactMarkdown>}
          </div>
          <div>{postData && <CommentsBlock postId={postData._id} />}</div>
        </div>
      )}
    </>
  );
};
