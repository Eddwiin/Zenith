package zenith.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import zenith.api.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByEmail(String email);
}
