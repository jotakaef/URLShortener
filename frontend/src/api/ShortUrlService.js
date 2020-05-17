import {API_URI} from "../Constants";
import axios from "axios";

class UrlShortenerController {
    getUrlShortened(originalUrl) {
        let data = new FormData();
        data.append("originalUrl", encodeURIComponent(originalUrl));
        return axios.post(`${API_URI}/shortUrl/shortIt/`, data);
    }

    getMyShortenedUrlsData() {
        return axios.get(`${API_URI}/shortUrl/getMyUrls`);
    }

    getOriginalUrl(originalUrl) {
        return axios.get(`${API_URI}/${originalUrl}`);
    }
}

export default new UrlShortenerController();
