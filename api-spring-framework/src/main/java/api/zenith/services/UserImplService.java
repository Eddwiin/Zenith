package api.zenith.services;

import api.zenith.entities.User;
import api.zenith.repositories.UserRepository;

import java.util.Optional;

public class UserImplService implements UserService{
    private UserRepository userRepository;

    public UserImplService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        Optional<User> userFound = userRepository.findByEmail(email);

        return userFound;
    }
}
