package api.zenith.services;
import api.zenith.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;


public class UserServiceTest {
    @Mock private UserRepository userRepository;
    UserService userService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserImplService(userRepository);
    }
    @Test
    public void should_call_findByEmail_from_userRepository() {
        String email = "test@example.com";
        userService.findByEmail(email);

        verify(userRepository).findByEmail(email);
    }
}
