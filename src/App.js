import "./App.scss";
import { useEffect } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { Alert } from "./components/Alert/Alert";
import { useSelector } from "react-redux";
import { getMessage } from "./redux/selectors/authSelectors";
import { PostsBlock } from "./components/PostsBlock/PostsBlock";
import { useDispatch } from "react-redux";
import { getAllPosts } from "./redux/actions/postsActions";
import { checkUserAuth } from "./redux/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const message = useSelector(getMessage);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="App">
      <PostsBlock />
      <Sidebar />
      <ModalWindow />
      <AppRouter />
      {message && <Alert>{message}</Alert>}
    </div>
  );
}

export default App;
