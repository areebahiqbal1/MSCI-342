import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import SignInForm from "../SignIn/SignIn";
import UploadForm from "../Upload";
import ReviewForm from "../Review";
import ViewPage from "../View";
import CalendarPage from "../Calendar";
import AdminPage from "../Admin";
import AdminView from "../AdminView";
import MyFilesPage from "../MyFiles";
import SignUpPage from "../SignUp";
import LandingPage from "../Landing/Landing";
import ProfilePage from "../Profile";
import ReviewerAppPage from "../ReviewerApp";

import HomePage from "../Home";
import history from "./history";
//import profile from "../Profile";

export default function PrivateRoute({ authenticated, ...rest }) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          exact
          {...rest}
          render={(props) =>
            authenticated === true ? (
              <HomePage {...props} {...rest} />
            ) : (
              <LandingPage {...props} {...rest} />
            )
          }
        />
        <Route path="/SignIn" component={SignInForm} />
        <Route path="/SignUp" component={SignUpPage} />
        <Route path="/Upload" component={UploadForm} />
        <Route path="/Review" component={ReviewForm} />
        <Route path="/Admin" component={AdminPage} />
        <Route path="/AdminView" component={AdminView} />
        <Route path="/View" component={ViewPage} />
        <Route path="/Calendar" component={CalendarPage} />
        <Route path="/MyFiles" component={MyFilesPage} />
        <Route path="/Profile" component={ProfilePage} />
        <Route path="/Apply" component={ReviewerAppPage} />
      </Switch>
    </Router>
  );
}
/*(
  <LandingPage {...props} {...rest} />
  )*/
