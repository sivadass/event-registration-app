import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import ProtectedRoute from "./protected-route";
import Dashboard from "./components/pages/dashboard";
import Header from "./components/common/header";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Footer from "./components/common/footer";
import NoMatch from "./components/pages/no-match";
import AddEvent from "./components/pages/add-event";
import EditEvent from "./components/pages/edit-event";
import EventDetails from "./components/pages/event-details";
import ScrollToTop from "./components/common/scroll-to-top";
import { store, history } from "./store";
import { saveState } from "./utils/local-storage";

import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

store.subscribe(() => {
  saveState(store.getState());
});

const App = props => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop>
          <div className="app-wrapper">
            <Header />
            <div className="main">
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <ProtectedRoute exact path="/" component={Dashboard} />
                <ProtectedRoute exact path="/add-event/" component={AddEvent} />
                <ProtectedRoute
                  exact
                  path="/events/:id/"
                  component={EventDetails}
                />
                <ProtectedRoute
                  exact
                  path="/events/:id/edit/"
                  component={EditEvent}
                />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
            <ToastContainer position="bottom-center" autoClose={5000} />
          </div>
        </ScrollToTop>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
