import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import "./styles/index.scss";

import Dashboard from "./components/pages/dashboard";
import Header from "./components/common/header";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Footer from "./components/common/footer";
import NoMatch from "./components/pages/no-match";
import AddEvent from "./components/pages/add-event";
import EditEvent from "./components/pages/edit-event";
import EventDetails from "./components/pages/event-details";

import reducer from "./reducers";
import { loadState, saveState } from "./utils/local-storage";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(...middleware)
);

store.subscribe(() => {
  saveState(store.getState());
});

const App = props => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-wrapper">
          <Header />
          <div className="main">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/" component={Dashboard} />
              <Route path="/add-event" component={AddEvent} />
              <Route exact path="/events/:id" component={EventDetails} />
              <Route exact path="/events/:id/edit" component={EditEvent} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
