package ca.franciscovasconcelos.venuiti.services;

import ca.franciscovasconcelos.venuiti.dto.ErrorDTO;
import ca.franciscovasconcelos.venuiti.model.ShortenedUrlBean;
import ca.franciscovasconcelos.venuiti.repositories.ShortenedUrlRepository;
import ca.franciscovasconcelos.venuiti.security.JwtUserDetails;
import ca.franciscovasconcelos.venuiti.util.ShortUrlUtil;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class UrlShortenerService {

    // Parameter to set the Max quantity days that a short url is valid. 30 is the requirement.
    private static final int MAX_VALID_DAYS = 30;

    final
    ShortenedUrlRepository repository;

    public UrlShortenerService(ShortenedUrlRepository repository) {
        this.repository = repository;
    }

    public String findMyShortnedUrls(JwtUserDetails userDetailsLogged) {
        List<ShortenedUrlBean> shortenedUrlBeans = repository.findByOwnerUserOrderByIdDesc(userDetailsLogged.getUsername());
        return new Gson().toJson(shortenedUrlBeans);
    }

    /**
     * @param userDetailsLogged
     * @param originalUrl
     * @return
     */
    public String shortUrl(JwtUserDetails userDetailsLogged, String originalUrl) {

        ShortenedUrlBean shortenedUrlBean = new ShortenedUrlBean();
        shortenedUrlBean.setOwnerUser(userDetailsLogged.getUsername());
        shortenedUrlBean.setDateCreation(new Timestamp(new Date().getTime()));
        shortenedUrlBean.setDateValid(Timestamp.valueOf(DAYS.addTo(shortenedUrlBean.getDateCreation().toLocalDateTime(), MAX_VALID_DAYS)));
        // I created this field as a future improvement, where the user could set the Short URL to only works when he is logged in the system.
        shortenedUrlBean.setIsPrivate(false);
        shortenedUrlBean.setOriginalUrl(originalUrl);
        Integer nSeed = repository.currentShortnedUrlId().intValue();

        /**
         * It is needed because I'm using the sequence to seed the id_hash and when it is not initiate yet it will return 1 for the first two times used.
         * I could done that in a more appropriate place, like a global init for the app, but to keep it simple...
         */
        if (nSeed.equals(1)) {
            nSeed = repository.initShortnedUrlIdSequence();
        }
        /**
         * This one is the best way that I found to do it, I generate a base 62 equivalent and save it
         * so it's cheap to lookup for it on the DB.
         */
        shortenedUrlBean.setIdHash(nSeed);
        shortenedUrlBean.setShortenedUrl(ShortUrlUtil.idToShortURL(shortenedUrlBean.getIdHash()));

        repository.save(shortenedUrlBean);

        return new Gson().toJson(shortenedUrlBean);
    }

    /**
     * Search by an URL using a shortened version of it
     *
     * @param shortUrl
     * @return
     */
    public String findOriginalUrl(String shortUrl) {
        Optional<ShortenedUrlBean> shortenedUrlBeanOpt = repository.findByIdHash(ShortUrlUtil.shortURLtoID(shortUrl));
        if (shortenedUrlBeanOpt.isPresent()) {
            ShortenedUrlBean shortenedUrlBean = shortenedUrlBeanOpt.get();
            if (new Date().after(shortenedUrlBean.getDateValid())) {
                return new Gson().toJson(new ErrorDTO("418", String.format("This Shortened URL was only valid until %s... sorry =\\.", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(shortenedUrlBean.getDateValid())), true));
            } else {
                return new Gson().toJson(shortenedUrlBean);
            }
        } else {
            return new Gson().toJson(new ErrorDTO("404", "There is no URL for this Shortened URL.... Sorry?", true));
        }

    }
}
