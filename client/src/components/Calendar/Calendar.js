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
import MenuBar from '../MenuBar/menu';

const opacityValue = 0.9;

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
          default: "#EDC7B7"
        },
        primary: {
          main: '#EEE2DC',
          light: '#EDC7B7',
          dark: '#EDC7B7',
          background: '#EE2DC'
        },
        secondary: {
          main: "#EDC7B7",
          light: '#EDC7B7',
          dark: '#BAB2B5'
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
  },
  title: {
    fontFamily: "cursive",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#f08699",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
    marginBottom: "1rem"
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
        start: "2023-03-27T10:30:00",
        end: "2023-03-27T13:00:00",
        backColor: "#e2edab"
      },
      {
        id: 2,
        text: "Event 2",
        start: "2023-03-28T09:30:00",
        end: "2023-03-28T11:30:00",
        backColor: "#fac2b6"
      },
      {
        id: 3,
        text: "Event 3",
        start: "2023-03-28T12:00:00",
        end: "2023-03-28T15:00:00",
        backColor: "#c0f0d6"
      },
      {
        id: 4,
        text: "Event 4",
        start: "2023-03-29T11:30:00",
        end: "2023-03-29T14:30:00",
        backColor: "#c9c3eb"
      },
    ];

    const startDate = "2023-03-26";

    this.calendar.update({startDate, events});

  }

  render() {
    return (
        <ThemeProvider theme={lightTheme}>
            <MenuBar />
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
                    style={{ maxWidth: '90%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                  <Typography variant="h1" align="center" style={styles.title}>
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
                                    showMonths={2}
                                    skipMonths={2}
                                    startDate={"2023-03-26"}
                                    selectionDay={"2023-03-26"}
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