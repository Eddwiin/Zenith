package zenith.api.services;

import zenith.api.entities.User;
import zenith.api.exceptions.emails.EmailIsNullException;

import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email) throws EmailIsNullException;
}
