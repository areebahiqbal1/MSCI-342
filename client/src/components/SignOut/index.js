import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import history from "../Navigation/history";
import Box from "@material-ui/core/Box";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';


class HomeBase extends React.Component {

signOut() {
    this.setState({ mobileMoreAnchorEl: null });
    this.props.firebase.doSignOut();
    this.props.history.push("/");
  }
render() {
    return (
<Button
key='5'
onClick={this.signOut.bind(this)}
sx={{ my: 2, color: 'white', display: 'block' }}
>
SignOut
</Button>
    )
}
}
const Home = compose(withRouter, withFirebase)(HomeBase);
export default Home;
