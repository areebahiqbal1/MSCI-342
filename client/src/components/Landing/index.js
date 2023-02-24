import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import history from '../Navigation/history';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {   
    }
  };

  render() {
    return (
      <Grid         
      container
      spacing={0}
      direction="column"
      justify="flex-end"
      alignItems="center">
        <Grid>
          <Typography variant='h6'>This is Landing Page</Typography>
        </Grid>
        <Grid>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => history.push('/SignIn')}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>

    );
  }
}

export default LandingPage;