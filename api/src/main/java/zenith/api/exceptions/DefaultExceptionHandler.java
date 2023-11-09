package zenith.api.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import zenith.api.exceptions.emails.EmailIsNullException;

import java.time.LocalDateTime;

@ControllerAdvice
public class DefaultExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EmailIsNullException.class)
    public ResponseEntity<ApiError> handleException(EmailIsNullException ex, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;
        ApiError apiError = configureApiError(ex.getMessage(), request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    private ApiError configureApiError(String message, HttpServletRequest request, HttpStatus errorStatus) {
        return new ApiError(
                request.getRequestURI(),
                message,
                errorStatus.value(),
                LocalDateTime.now()
        );
    }
}
