package zenith.api.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import zenith.api.repositories.AuthRepository;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class AuthImplServiceTest {
    @Mock private AuthRepository authRepositoryTest;

    private AuthService authServiceTest;

    @BeforeEach
    void setup() {
        authServiceTest = new AuthImplService(authRepositoryTest);
    }

    @AfterEach
    void tearDown() {
        authRepositoryTest.deleteAll();
    }

    @Test
    public void should_return_true_if_email_exists() {
        String email = "test@example.com";
        authServiceTest.checkIfExmailExists(email);

        verify(authRepositoryTest).findByEmail(email);
    }
}
