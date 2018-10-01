import { routerMiddleware, connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
import { loadState } from "./utils/local-storage";

export const history = createBrowserHistory();

const middleware = [thunk];

middleware.push(routerMiddleware(history));

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const persistedState = loadState();

export const store = createStore(
  connectRouter(history)(reducer),
  persistedState,
  applyMiddleware(...middleware)
);
