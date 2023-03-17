import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

const opacityValue = 0.9;

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#ef9a9a',
            light: '#ffcccb',
            dark: '#ba6b6c',
            background: '#eeeeee'
        },
        secondary: {
            main: "#b71c1c",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))
const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {

    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2023-03-07T10:30:00",
        end: "2023-03-07T13:00:00"
      },
      {
        id: 2,
        text: "Event 2",
        start: "2023-03-08T09:30:00",
        end: "2023-03-08T11:30:00",
        backColor: "#6aa84f"
      },
      {
        id: 3,
        text: "Event 3",
        start: "2023-03-08T12:00:00",
        end: "2023-03-08T15:00:00",
        backColor: "#f1c232"
      },
      {
        id: 4,
        text: "Event 4",
        start: "2023-03-06T11:30:00",
        end: "2023-03-06T14:30:00",
        backColor: "#cc4125"
      },
    ];

    const startDate = "2023-03-07";

    this.calendar.update({startDate, events});

  }

  render() {
    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button
                            key='1'
                            onClick={() => history.push('/')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            key='2'
                            onClick={() => history.push('/MyFiles')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            My Files
                        </Button>
                        <Button
                            key='3'
                            onClick={() => history.push('/Upload')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Upload
                        </Button>
                        <Button
                            key='4'
                            onClick={() => history.push('/Profile')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Profile
                        </Button>
                        <Button
                            key='5'
                            onClick={() => history.push('/SignOut')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            SignOut
                        </Button>
                        <Button
                            key='6'
                            onClick={() => history.push('/Review')}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                        >
                            Review
                        </Button>
                        <Button
                            key='6'
                            onClick={() => history.push('/Calendar')}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                        >
                            Calendar
                        </Button>
                        <Button
                            key='6'
                            onClick={() => history.push('/Admin')}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                        >
                            Admin
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                    backgroundSize: "cover"
                }}
            >
                <MainGridContainer
                    container
                    spacing={1}
                    style={{ maxWidth: '50%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography variant="h3" gutterBottom component="div">
                        Calendar
                    </Typography>
                    <Typography variant="h6" component="div">
                        Organize your schedule.
                    </Typography>
                    <br />
                    <Grid>
                        <div style={styles.wrap}>
                            <div style={styles.left}>
                                <DayPilotNavigator
                                    selectMode={"week"}
                                    showMonths={3}
                                    skipMonths={3}
                                    startDate={"2023-03-07"}
                                    selectionDay={"2023-03-07"}
                                    onTimeRangeSelected={ args => {
                                        this.calendar.update({
                                            startDate: args.day
                                        });
                                    }}
                                />
                            </div>
                            <div style={styles.main}>
                                <DayPilotCalendar
                                    {...this.state}
                                    ref={this.calendarRef}
                                />
                            </div>
                        </div>
                    </Grid>
                    <br />
                </MainGridContainer>

            </Box>

        </ThemeProvider>
    );
}
}

export default Calendar;
