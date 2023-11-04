package zenith.api.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
@Entity
public class User {
    @Id
    private String id;

    public User() {

    }
}
