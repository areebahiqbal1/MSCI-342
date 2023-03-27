import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@mui/material/Paper';
import MenuBar from '../MenuBar/menu';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const opacityValue = 0.9;

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#EEE2DC',
            light: '#f5eae6',
            dark: '#ffffff',
            background: '#ffffff'
        },
        secondary: {
            main: "#EDC7B7",
            light: '#ffffff',
            dark: '#ffffff'
        },
    },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const App = () => {

    const faqData = [
        {
            question: 'Question 1',
            answer: 'Answer 1'
        },
        {
            question: 'Question 2',
            answer: 'Answer 2'
        },
        {
            question: 'Question 3',
            answer: 'Answer 3'
        },
        {
            question: 'Question 4',
            answer: 'Answer 4'
        }
    ];

    return (
        <ThemeProvider theme={lightTheme}>
            <MenuBar />
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                      backgroundImage: `url(https://source.unsplash.com/_0sEjWfAK3Q)`,
                      backgroundSize: "cover"

                }}
            >
                <MainGridContainer
                    container
                    spacing={1}
                    style={{ maxWidth: '800px' }}
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
                            color: '#000', 
                            fontSize: '3rem', 
                            fontWeight: 'bold', 
                            textShadow: '1px 1px #ccc', 
                            letterSpacing: '0.1em', 
                            lineHeight: '1.2', 
                            }}
                            >
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="h6" component="div">
                        Browse our precurated answers to your questions.
                    </Typography>
                    <br />
                    {faqData.map((faq, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`faq-${index}-content`}
                                id={`faq-${index}-header`}
                            >
                                <Typography variant="h6" component="div">
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails  sx={{  backgroundColor: '#2196f3', color: '#fff'  }}>
                                <Typography>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <br />
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

export default App;
