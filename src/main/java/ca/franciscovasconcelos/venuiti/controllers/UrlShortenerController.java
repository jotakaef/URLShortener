package ca.franciscovasconcelos.venuiti.controllers;

import ca.franciscovasconcelos.venuiti.security.JwtTokenUtil;
import ca.franciscovasconcelos.venuiti.services.UrlShortenerService;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Log4j2
public class UrlShortenerController {

    private final UrlShortenerService urlShortenerService;

    public UrlShortenerController(UrlShortenerService urlShortenerService) {
        this.urlShortenerService = urlShortenerService;
    }

    /**
     * Take one URL as parameter, create a shortened version save on DB and return the shortened version
     *
     * @param originalUrl the URl that you want to Short
     * @return The JSON of the URL shortened
     */
    @PostMapping(path = "/shortUrl/shortIt/")
    public String getShortUrl(@RequestParam String originalUrl) {
        return urlShortenerService.shortUrl(new JwtTokenUtil().getUserDetailsLogged(), originalUrl);
    }

    /**
     * Return the list of all shortened URL of a specific user.
     *
     * @return The JSONArray with all JSON Url Shortened
     */
    @GetMapping(path = "/shortUrl/getMyUrls")
    public String getMyShortenedUrls() {
        return urlShortenerService.findMyShortnedUrls(new JwtTokenUtil().getUserDetailsLogged());
    }

    /**
     * Return the Original URL based on a shortened one
     *
     * @param shortUrl shortened URL
     * @return JSON of the original URL, if it is not found it return an Error Object
     * (but stills return as a success, the error is controlled by the other side)
     */
    @GetMapping(path = "/{shortUrl}")
    public String getOriginalUrl(@PathVariable String shortUrl) {
        return urlShortenerService.findOriginalUrl(shortUrl);
    }
}
