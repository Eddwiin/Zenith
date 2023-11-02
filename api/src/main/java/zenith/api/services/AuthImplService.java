package zenith.api.services;

import org.springframework.stereotype.Service;
import zenith.api.repositories.AuthRepository;

@Service
public class AuthImplService implements AuthService {
    private final AuthRepository authRepository;

    public AuthImplService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public void checkIfExmailExists(String email) {

    }
}
