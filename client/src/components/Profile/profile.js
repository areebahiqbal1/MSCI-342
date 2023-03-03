//import * as React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

import React, { Component } from "react";

//import ListItemButton from '@material-ui/core/ListItemButton';
import history from "../Navigation/history";

// Get the current user
//const currentUser = firebase.doGetUserByEmail();
//

class Profile extends Component {
  static contextType = withFirebase;

  state = {
    currentUser: null,
  };

  componentDidMount() {
    this.unsubscribe = this.context.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ currentUser: user });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doGetUserByEmail(email)
      .then(() => {
        this.setState({ });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error: true });
      });

    event.preventDefault();
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { currentUser } = this.state;

    return <div>{currentUser && currentUser.email}</div>;
  }
}

export default Profile;
