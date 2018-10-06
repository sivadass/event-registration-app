import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import DynamicImport from "./dynamic-import";
import ProtectedRoute from "./protected-route";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import NoMatch from "./components/pages/no-match";
import Loader from "./components/common/loader";
import ScrollToTop from "./components/common/scroll-to-top";
import { store, history } from "./store";
import { saveState } from "./utils/local-storage";

const Login = props => (
  <DynamicImport load={() => import("./components/pages/login")}>
    {Component => (Component === null ? <Loader /> : <Component {...props} />)}
  </DynamicImport>
);
const Register = props => (
  <DynamicImport load={() => import("./components/pages/register")}>
    {Component => (Component === null ? <Loader /> : <Component {...props} />)}
  </DynamicImport>
);
const Dashboard = props => (
  <DynamicImport load={() => import("./components/pages/dashboard")}>
    {Component => (Component === null ? <Loader /> : <Component {...props} />)}
  </DynamicImport>
);

const AddEvent = props => (
  <DynamicImport load={() => import("./components/pages/add-event")}>
    {Component => (Component === null ? <Loader /> : <Component {...props} />)}
  </DynamicImport>
);

const EditEvent = props => (
  <DynamicImport load={() => import("./components/pages/edit-event")}>
    {Component => (Component === null ? <Loader /> : <Component {...props} />)}
  </DynamicImport>
);

const EventDetails = props => (
  <DynamicImport load={() => import("./components/pages/event-details")}>
    {Component => (Component === null ? <Loader /> : <Component {...props} />)}
  </DynamicImport>
);

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
                <Route path="/login/" component={Login} />
                <Route path="/register/" component={Register} />
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
