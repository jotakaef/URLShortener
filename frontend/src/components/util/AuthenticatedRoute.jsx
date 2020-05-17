import React, {Component} from "react";
import {isUserLoggedIn} from "../../api/AuthenticationService";
import {Redirect, Route} from "react-router-dom";

class AuthenticatedRoute extends Component {
    render() {
        if (isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to={"/login"}/>
        }
    }
}

export default AuthenticatedRoute;
