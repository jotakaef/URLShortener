import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import {useHistory} from "react-router";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AuthenticationService from "../../api/AuthenticationService";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
}));

export function StickyFooter() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Copyright/>
            </Container>
        </footer>
    )
}

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" target={"_blank"} href="https://www.linkedin.com/in/francisco-vasconcelos-201b723/">
                Francisco Vasconcelos
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function LoginComponent() {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleClick = () => {
        ;
        setOpen(true);
    };

    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Francisco | Venuiti Url Shortener
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} variant="rounded" src={"../images/logo.png"}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)} value={password}
                            autoComplete="current-password"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => {
                                loginClick(username, password, history, handleClick, setErrorMsg)
                            }}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
            <StickyFooter/>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity="warning">
                    Something wrong happen... {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}

function loginClick(username, password, history, errorSnackBar, setErrorMsg) {
    AuthenticationService.executeJwtAuthentication(username, password).then((response) => {
        AuthenticationService.registerSuccessfulLogin(username, response.data.token);
        history.push(`/welcome/${username}`);
    }).catch((e) => {
        setErrorMsg(e.message);
        errorSnackBar();
    });
}


export default LoginComponent;
