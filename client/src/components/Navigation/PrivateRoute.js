import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import SignInForm from "../SignIn/SignIn";
import SignUpPage from "../SignUp";
import ProfilePage from "../Profile/profile";
import LandingPage from "../Landing/Landing";
import HomePage from "../Home";
import history from "./history";

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
        <Route path="/profile" component={ProfilePage} />
      
      </Switch>
    </Router>
  );
}
/*(
  <LandingPage {...props} {...rest} />
  )*/
