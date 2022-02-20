import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  uploadPost,
  toggleMessage,
} from "../../redux/actions/postsActions.js";
import { getMessage, getPostData } from "../../redux/selectors/postsSelectors";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePostForm.module.scss";

const SignupSchema = yup.object().shape({
  title: yup.string().required("Заполните поле"),
  description: yup.string().required("Заполните поле"),
});

export const CreatePostForm = () => {
  const message = useSelector(getMessage);
  const postData = useSelector(getPostData);
  const postId = postData && postData._id;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (message === "Запись добавлена") {
      navigation(`/posts/${postId}`);
    }
    dispatch(toggleMessage(null));
  }, [message, postId, navigation, dispatch]);

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", inputFileRef.current);
    const { url } = await dispatch(uploadImage(formData));
    dispatch(
      uploadPost({
        title: data.title,
        photoUrl: url,
        description: data.description,
        text,
      })
    );
    reset();
  };

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  return (
    <div className={styles.form__wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__title}>
          <input placeholder="Введите заголовок..." {...register("title")} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className={styles.form__text}>
          <label>Короткое описание</label>
          <textarea {...register("description")} />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className={styles.form__file}>
          <label>Ссылка на изображение:</label>
          <input
            required
            type="file"
            name="file"
            id="input__file"
            {...register("file")}
            onChange={(event) => {
              const target = event.target;
              const file = target.files[0];
              inputFileRef.current = file;
            }}
          />
        </div>
        <div className={styles.form__description}>
          <SimpleMDE
            value={text}
            onChange={onChange}
            options={autofocusNoSpellcheckerOptions}
          />
        </div>
        <input className={styles.form__submit_input} type="submit" />
      </form>
    </div>
  );
};
