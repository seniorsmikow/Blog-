import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { deletePost } from "../../redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/selectors/authSelectors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageBack from "../../img/javascript.png";

export const Post = ({
  id,
  title,
  description,
  createdAt,
  views,
  img,
  userId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const idUserOwnerPost = userData && userData._id;
  const date = formatDate(createdAt);
  const adminId = "61e6d0b75a80bd98f79ccb30";

  const showPost = (id) => {
    navigate(`/posts/${id}`);
  };

  const removePost = () => {
    if (window.confirm("Удалить запись?")) {
      dispatch(deletePost(id));
    }
  };

  return (
    <div className={styles.post__wrapper}>
      <div className={styles.post__info}>
        <div className={styles.post__title} onClick={() => showPost(id)}>
          {title}
        </div>
        <p>{description}</p>
        <div className={styles.post__footer}>
          <span>{date}</span>
          <div className={styles.post__footer_counter}>
            <RemoveRedEyeIcon />
            <span>{views}</span>
          </div>
        </div>
      </div>
      {img && (
        <div className={styles.post__image}>
          {img ? (
            <img src={`${img}`} alt="post" />
          ) : (
            <img src={ImageBack} alt="post" />
          )}
        </div>
      )}
      <div className={styles.edit__post_icons}>
        {idUserOwnerPost === (userId || adminId) && (
          <div onClick={removePost}>
            <DeleteForeverIcon />
          </div>
        )}
      </div>
    </div>
  );
};
