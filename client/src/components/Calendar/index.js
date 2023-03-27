import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from "../Navigation/history";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import firebase from "firebase/app";
import MenuBar from "../MenuBar/menu";

const opacityValue = 0.9;

const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#ef9a9a",
      light: "#ffcccb",
      dark: "#ba6b6c",
      background: "#eeeeee",
    },
    secondary: {
      main: "#b71c1c",
      light: "#f05545",
      dark: "#7f0000",
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}));
const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
  title: {
    fontFamily: "cursive",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "pink",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
    marginBottom: "1rem",
  },
};
const endpoint = "http://localhost:4000/dateUpload";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      list: [{ start_date: "", end_date: "", date_title: "", date_id: 1 }],
      userEmail: "",
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRange: async (args) => {
        const Data = {
          email: this.state.userEmail,
        };
        axios
          .post("http://localhost:4000/getDates", Data, {})
          .then(
            function (response) {
              console.log(response.data.express);
              var parsed = JSON.parse(response.data.express);
              console.log(parsed);
              this.setState({ list: parsed });
              const events = this.state.list.map((item) => {
                return {
                  id: item.date_id,
                  text: item.date_title,
                  start: item.start_date,
                  end: item.end_date,
                };
              });
              console.log(events);
              const startDate = "2023-03-19";

              this.calendar.update({ startDate, events });
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error);
          });
      },
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new event:",
          "Event 1"
        );
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
        });
        // define upload
        const data = new FormData();
        data.append("title", "non");
        data.append("end", args.end);
        data.append("start", args.start);
        data.append("email", "bingo@gmail.com");

        const Data = {
          title: modal.result,
          end: args.end,
          start: args.start,
          email: this.state.userEmail,
        };

        console.log(Data);

        axios
          .post(endpoint, Data, {
            onUploadProgress: (ProgressEvent) => {
              this.setState({
                loaded: Math.round(
                  (ProgressEvent.loaded / ProgressEvent.total) * 100
                ),
              });
            },
          })
          .then(() => {
            setTimeout(() => {
              axios
                .post("http://localhost:4000/getDates", Data, {})
                .then(
                  function (response) {
                    console.log(response.data.express);
                    var parsed = JSON.parse(response.data.express);
                    console.log(parsed);
                    this.setState({ list: parsed });
                    const events = this.state.list.map((item) => {
                      return {
                        id: item.date_id,
                        text: item.date_title,
                        start: item.start_date,
                        end: item.end_date,
                      };
                    });
                    console.log(events);
                    const startDate = "2023-03-19";

                    this.calendar.update({ startDate, events });
                  }.bind(this)
                )
                .catch(function (error) {
                  console.log(error);
                });
            }, 1000);
          });
        //const list = [{ start_date: "2023-03-21T10:30:00", end_date: "2023-03-21T13:00:00", date_title: "Event 1", date_id: 1 }];
      },
      eventDeleteHandling: "Update",
      onEventClick: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Update event text:",
          args.e.text()
        );
        if (!modal.result) {
          return;
        }
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
    firebase.auth().onAuthStateChanged((user) => {
      //if user is logged in then get the user email
      if (user) {
        this.setState({ userEmail: user.email }, () => {
          // Call onTimeRange only after userEmail state has been updated
          this.state.onTimeRange();
        });
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <MenuBar />
        <Box
          sx={{
            height: "100vh",
            opacity: opacityValue,
            overflow: "scroll",
            backgroundSize: "cover",
          }}
        >
          <MainGridContainer
            container
            spacing={1}
            style={{ maxWidth: "90%" }}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Typography
              variant="h1"
              component="h1"
              align="center"
              gutterBottom
              style={{
                color: "#000",
                fontSize: "3rem",
                fontWeight: "bold",
                textShadow: "1px 1px #ccc",
                letterSpacing: "0.1em",
                lineHeight: "1.2",
              }}
            >
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
                    startDate={"2023-03-19"}
                    selectionDay={"2023-03-19"}
                    onTimeRangeSelected={(args) => {
                      this.calendar.update({
                        startDate: args.day,
                      });
                    }}
                  />
                </div>
                <div style={styles.main}>
                  <DayPilotCalendar {...this.state} ref={this.calendarRef} />
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
