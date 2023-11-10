package api.zenith.services;

import api.zenith.entities.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
}
