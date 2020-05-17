package ca.franciscovasconcelos.venuiti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FVVenuitiUrlShortenerApplication {

    public static void main(String[] args) {
        System.setProperty("org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH", "true");
        SpringApplication.run(FVVenuitiUrlShortenerApplication.class, args);
    }

}
