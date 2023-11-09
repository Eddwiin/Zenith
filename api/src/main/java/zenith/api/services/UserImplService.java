package zenith.api.services;

import org.springframework.stereotype.Service;
import zenith.api.entities.User;
import zenith.api.exceptions.emails.EmailIsNullException;
import zenith.api.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserImplService implements UserService {
    private final UserRepository userRepository;

    public UserImplService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByEmail(String email) throws EmailIsNullException {
        if (email == null || email.isEmpty()) {
            throw new EmailIsNullException("Email is empty");
        }
        Optional<User> user = userRepository.findByEmail(email);

        return user;
    }
}
