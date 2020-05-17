package ca.franciscovasconcelos.venuiti.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

    static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();


    /**
     * don't need to get super complex on that part...so...
     * Just one Static User (admin/admin)...
     */
    static {
        inMemoryUserList.add(new JwtUserDetails(1L, "admin",
                "$2a$10$yZcH3DBantBjwG5iAbssc.1tCjsGoqiS4kNQlmAdVLL09.ivqsghK", "ROLE_USER_1"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
                .filter(user -> user.getUsername().equals(username)).findFirst();

        if (!findFirst.isPresent()) {
            throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
        }

        return findFirst.get();
    }

}
