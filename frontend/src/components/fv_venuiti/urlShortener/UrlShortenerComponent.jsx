import React, {useState} from "react";
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Copyright} from '../LoginComponent';
import MyUrlsItens from "./MyUrlsComponent";
import HeaderComponent from "../template/HeaderComponent";
import Title from "../template/Title";
import {ResponsiveContainer} from "recharts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShortUrlService from "../../../api/ShortUrlService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {APP_URI} from "../../../Constants";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    appBarSpacer: theme.mixins.toolbar,
    submit: {
        float: "right"
    }
}));

export default function UrlShortener() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [originalUrl, setOriginalUrl] = useState("");
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [updateList, setUpdateList] = useState("");
    const handleClick = () => {
        setOpen(true);
    };
    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    return (
        <div className={classes.root}>
            <HeaderComponent title={"Short Your URL!"}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* URL Shortener */}
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                <React.Fragment>
                                    <Title>Enter the URL to be Encoded</Title>
                                    <ResponsiveContainer>
                                        <form>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                label={"http://..."}
                                                id="originalUrl"
                                                name="originalUrl"
                                                autoComplete="originalUrl"
                                                autoFocus
                                                onChange={e => setOriginalUrl(e.target.value)}
                                                value={originalUrl}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size={"large"}
                                                className={classes.submit}
                                                onClick={() => {
                                                    shortURL(originalUrl, handleClick, handleClickSuccess, setMsg)
                                                }}
                                            >
                                                Short It!
                                            </Button>
                                        </form>
                                    </ResponsiveContainer>
                                    <Typography color="textSecondary" className={classes.totalContext}>

                                    </Typography>
                                </React.Fragment>
                            </Paper>
                        </Grid>
                        {/* List of URL's Shortened */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <MyUrlsItens data={updateList}/>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
                <Snackbar open={open} autoHideDuration={6000}>
                    <Alert severity="warning">
                        Something wrong happen... {msg}
                    </Alert>
                </Snackbar>
                <Snackbar open={openSuccess} autoHideDuration={6000}>
                    <Alert severity="success">
                        {msg}
                    </Alert>
                </Snackbar>
            </main>
        </div>
    );

    function shortURL(originalUrl, errorSnackBar, successSnackBar, setMsg) {
        ShortUrlService.getUrlShortened(originalUrl).then((response) => {
            setUpdateList(response.data);
            setMsg(`URL Shortened with Success! Your new URL is ${APP_URI + "/" + response.data.shortenedUrl} !`);
            successSnackBar();
        }).catch((e) => {
            setMsg(e.message);
            errorSnackBar();
        });
    }
}
