package zenith.api.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import zenith.api.entities.User;
import zenith.api.services.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser
@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @MockBean
    private UserService userService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void should_return_false_if_email_not_exists() throws Exception {
        when(userService.findByEmail(any())).thenReturn(Optional.empty());

        Map<String, Boolean> mockResponseToReturn = new HashMap<>();
        mockResponseToReturn.put("emailIsExists", false);

        mockMvc.perform(
                get("/v1/auth/checkEmailExists")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("email", "test@example.com"))
                .andExpect(status().isOk())
                .andExpect(content().json("{emailIsExists: false}"));
    }

    @Test
    public void should_return_true_if_email_has_found() throws Exception {
        User userFound = new User();
        when(userService.findByEmail(any())).thenReturn(Optional.of(userFound));

        mockMvc.perform(
                get("/v1/auth/checkEmailExists")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("email", "test@example.com"))
                .andExpect(status().isOk())
                .andExpect(content().json("{emailIsExists: true}"));
    }
}



