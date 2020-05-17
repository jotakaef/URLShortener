import axios from 'axios';
import {API_URI} from "../Constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
export const JWT_USER_TOKEN = "JwtUserToken";

axios.interceptors.request.use(
    (config) => {
        if (isUserLoggedIn()) {
            config.headers.authorization = sessionStorage.getItem(JWT_USER_TOKEN);
            config.headers["Access-Control-Allow-Origin"] = "http://localhost:4200";
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    });

export function isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
        return false;
    } else {
        return true;
    }
}

class AuthenticationService {
    executeJwtAuthentication(username, password) {
        return axios.post(`${API_URI}/authenticate`, {
            username, password
        })
    }

    registerSuccessfulLogin(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(JWT_USER_TOKEN, this.createJWTToken(token));
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }


    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user === null ? "" : user;
    }

    createJWTToken(token) {
        return `Bearer ${token}`;
    }

}

export default new AuthenticationService();
