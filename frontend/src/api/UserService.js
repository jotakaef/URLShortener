import axios from "axios";
import {API_URI} from "../Constants";

class UserService {
    executeHelloWorldService() {
        return axios.get(`${API_URI}/hello-world`);
    }

    executeHelloWorldServiceBean() {
        return axios.get(`${API_URI}/hello-world-bean`);
    }

    executeHelloWorldServiceBeanPathVariable(name) {
        let user = "user";
        let pass = "password2";

        let basicAuthHeader  = "Basic " + window.btoa(user + " : " + pass);

        return axios.get(`${API_URI}/hello-world-bean/path-variable/${name}`,
        {headers : {
                authorization: basicAuthHeader
            }}
        );
    }
}

export default new UserService();
