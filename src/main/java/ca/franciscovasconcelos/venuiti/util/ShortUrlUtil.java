package ca.franciscovasconcelos.venuiti.util;

import java.io.IOException;

/**
 * I got this algorithm from the Internet, for me was the best way to do the trick because
 * I can save an "index" for the URL string.
 */
public class ShortUrlUtil {

    public static final String POSSIBLE_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static String idToShortURL(int n) {
        // Map to store 62 possible characters
        char[] map = POSSIBLE_CHARS.toCharArray();

        StringBuffer shorturl = new StringBuffer();

        // Convert given integer id to a base 62 number
        while (n > 0) {
            // use above map to store actual character
            // in short url
            shorturl.append(map[n % 62]);
            n = n / 62;
        }

        // Reverse shortURL to complete base conversion
        return shorturl.reverse().toString();
    }

    // Function to get integer ID back from a short url
    public static int shortURLtoID(String shortURL) {
        int id = 0; // initialize result

        // A simple base conversion logic
        for (int i = 0; i < shortURL.length(); i++) {
            if ('a' <= shortURL.charAt(i) &&
                    shortURL.charAt(i) <= 'z')
                id = id * 62 + shortURL.charAt(i) - 'a';
            if ('A' <= shortURL.charAt(i) &&
                    shortURL.charAt(i) <= 'Z')
                id = id * 62 + shortURL.charAt(i) - 'A' + 26;
            if ('0' <= shortURL.charAt(i) &&
                    shortURL.charAt(i) <= '9')
                id = id * 62 + shortURL.charAt(i) - '0' + 52;
        }
        return id;
    }

    public static void main(String[] args) throws IOException {
        int n = 1234213443;
        String shorturl = idToShortURL(n);
        System.out.println("Generated short url is " + shorturl);
        System.out.println("Id from url is " + shortURLtoID(shorturl));
    }
}
