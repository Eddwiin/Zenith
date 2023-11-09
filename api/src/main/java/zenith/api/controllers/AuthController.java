package zenith.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import zenith.api.entities.User;
import zenith.api.exceptions.emails.EmailIsNullException;
import zenith.api.services.UserService;

import java.util.Map;
import java.util.Optional;

@RestController()
@RequestMapping("/v1/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/checkEmailExists")
    public ResponseEntity<Map<String, Boolean>> checkEmailExists(@RequestParam(name = "email") String email) throws EmailIsNullException {
        Optional<User> userFound = userService.findByEmail(email);

        return ResponseEntity.ok(Map.of("emailIsExists", userFound.isPresent()));
    }
}
