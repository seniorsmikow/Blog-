import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/authReducer";
import { appReducer } from "./reducers/appReducer";
import { postsReducer } from "./reducers/postsReducer";
import { commentsReducer } from "./reducers/commentsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

window.__store__ = store;

export default store;
