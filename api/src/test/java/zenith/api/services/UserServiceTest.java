package zenith.api.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import zenith.api.exceptions.emails.EmailIsNullException;
import zenith.api.repositories.UserRepository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock private UserRepository userRepositoryTest;
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserImplService(userRepositoryTest);
    }

    @AfterEach()
    public void tearDown() {
        userRepositoryTest.deleteAll();
    }

    @Test
    public void should_call_findByEmail_from_userRepository() throws EmailIsNullException {
        String email = "test@example.com";
        userService.findByEmail(email);

        verify(userRepositoryTest).findByEmail(email);
    }

    @Test
    public void should_throw_exception_when_email_is_null() {
        assertThatThrownBy(() -> userService.findByEmail(null))
                .isInstanceOf(EmailIsNullException.class)
                .hasMessageContaining("Email is empty");

        verify(userRepositoryTest, never()).findByEmail(null);

    }

    @Test
    public void should_throw_exception_when_email_is_empty_string() {
        assertThatThrownBy(() -> userService.findByEmail(""))
                .isInstanceOf(EmailIsNullException.class)
                .hasMessageContaining("Email is empty");

        verify(userRepositoryTest, never()).findByEmail("");
    }
}
