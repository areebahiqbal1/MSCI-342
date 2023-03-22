import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import { withFirebase } from '../Firebase';
import store from '../Store/store'
import { Provider }from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      authenticated: false,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? (
            this.setState({ authenticated: true, authUser: authUser })

          ) : (
            this.setState({ authenticated: false, authUser: null })
          )
      },
    );
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    const authUser = this.props.authUser;
    return (
      <Provider store={store}>
        <Router>
          <div>
            <PrivateRoute 
              authenticated={this.state.authenticated} 
              authUser={this.state.authUser} 
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withFirebase(App);