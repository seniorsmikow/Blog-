import styles from "./PostsPage.module.scss";
import { useEffect } from "react";
import { EditPostForm } from "../../forms/EditPostForm/EditPostForm";
import { getAllPosts } from "../../redux/actions/postsActions";
import { useDispatch } from "react-redux";

export const EditPostPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className={styles.posts__wrapper}>
      <EditPostForm />
    </div>
  );
};
