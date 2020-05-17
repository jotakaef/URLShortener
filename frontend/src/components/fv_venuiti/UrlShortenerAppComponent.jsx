import React, {Component, useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import LoginComponent, {StickyFooter} from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import {CssBaseline} from "@material-ui/core";
import UrlShortener from "./urlShortener/UrlShortenerComponent";
import AuthenticatedRoute from "../util/AuthenticatedRoute";
import ShortUrlService from "../../api/ShortUrlService";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    hidden: {
        display: 'none'
    }
}));

class FVUrlShortenerApp extends Component {
    render = () => {
        return (
            <Router>
                <CssBaseline/>
                <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" exact component={LoginComponent}/>
                    <AuthenticatedRoute path="/logout" exact component={LogoutComponent}/>
                    <AuthenticatedRoute path="/welcome" exact component={UrlShortener}/>
                    <AuthenticatedRoute path="/welcome/:name" exact component={UrlShortener}/>
                    <Route path="/:shortUrl" component={GoToOriginalUrlComponent}/>
                    <Route component={ErrorComponent}/>
                </Switch>

            </Router>
        );
    }
}

export function ErrorComponent() {
    return <div>Pew...Page not found...</div>;
}

export function GoToOriginalUrlComponent() {
    const {shortUrl} = useParams();
    const classes = useStyles();
    // 5 seconds to redirect
    const [secondsToRed, setSecondsToRed] = useState(5);
    const [shortenedUrlData, setShortenedUrlData] = useState({});
    const [isSuccess, setIsSuccess] = useState("none");
    const [isError, setIsError] = useState("none");

    useEffect(() => {
        if (shortenedUrlData.originalUrl !== undefined) {
            if (secondsToRed > 0) {
                setTimeout(() => {
                    setSecondsToRed(secondsToRed - 1);
                }, 1000);
            } else {
                window.location = decodeURIComponent(shortenedUrlData.originalUrl);
            }
        }
    });

    useEffect(() => {
        ShortUrlService.getOriginalUrl(shortUrl).then((response) => {
            setShortenedUrlData(response.data);

            if (response.data.isError !== undefined) {
                setIsError("");
            } else {
                setIsSuccess("");
            }

        }).catch((e) => {
            console.log(e.message);
            setShortenedUrlData({isError: true, id: 0, description: e.message});
            setIsSuccess("");
        });
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Francisco | Venuiti Url Shortener
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component={"div"} display={isError}>
                <Container component="main" maxWidth="md">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" color={"error"}>
                            {shortenedUrlData.id !== undefined ? `${shortenedUrlData.id} - ${shortenedUrlData.description}` : ""}
                        </Typography>
                    </div>
                </Container>
            </Box>
            <Box component={"div"} display={isSuccess}>
                <Container component="main" maxWidth="md">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            You will be redirected in {secondsToRed} seconds to:
                        </Typography>
                    </div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="urlToGo"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={decodeURIComponent(shortenedUrlData.originalUrl)}
                    />
                </Container>
            </Box>
            <StickyFooter/>
        </div>);
}


export default FVUrlShortenerApp;
