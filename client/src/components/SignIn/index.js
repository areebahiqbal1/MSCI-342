import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      browserType: '',
      error: false,
      passwordResetEmailSent: false,
      errorPasswordResetEmailSent: false,

    };
  }

  componentDidMount() {
   //
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: true });
      });

    event.preventDefault();
  };

  onPasswordReset = event => {
    const email = this.state.email;
    console.log("email: ", email);

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        // Email sent.
        this.setState({
          error: false,
          passwordResetEmailSent: true
        });
      })
      .catch(error => {
        // An error happened.
        this.setState({
          error: false,
          errorPasswordResetEmailSent: true
        });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';


    return (

        <div >

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            
          >
            <Grid item>
              <Container maxWidth="xs">
                <form  noValidate onSubmit={this.onSubmit}>
                  <div >
                    <Typography component="h1" variant="h10" color="primary">
                      Sign In
				        </Typography>
                  </div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    value={email}
                    onChange={this.onChange}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    InputLabelProps={{ shrink: true }}
                  />
                  <React.Fragment>
                  {this.state.error ? (
                    <Typography>
                      Wrong userID or password.
                      <Link
                        variant="body1"
                        onClick = {this.onPasswordReset}
                      >
                        Reset password.
				              </Link>
                    </Typography>
                  ) : (
                      ''
                    )}
                  </React.Fragment>
                  <React.Fragment>
                  {this.state.passwordResetEmailSent ? (
                    <Typography>
                      Password reset link sent to <b>{this.state.email}</b>
                    </Typography>
                  ) : (
                      ''
                    )}
                  </React.Fragment>
                  <React.Fragment>
                  {this.state.errorPasswordResetEmailSent ? (
                    <Typography>
                      Account with this email address does not exist.
                    </Typography>
                  ) : (
                      ''
                    )}
                  </React.Fragment>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign In
				          </Button>
                </form>
              </Container>
            </Grid>
          </Grid>
        </div>
    );
  }
}



const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;