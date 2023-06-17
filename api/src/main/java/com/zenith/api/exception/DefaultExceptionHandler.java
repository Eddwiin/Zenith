package com.zenith.api.exception;

import com.zenith.api.exception.email.EmailEmptyException;
import com.zenith.api.exception.email.EmailExistException;
import com.zenith.api.exception.email.EmailNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class DefaultExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<ApiError> handleException(EmailNotFoundException ex, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.NOT_FOUND;
        ApiError apiError = configureApiError(ex.getMessage(), request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EmailEmptyException.class)
    public ResponseEntity<ApiError> handleException(EmailEmptyException ex, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;
        ApiError apiError = configureApiError(ex.getMessage(), request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(EmailExistException.class)
    public ResponseEntity<ApiError> handleException(EmailExistException ex, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.FORBIDDEN;
        ApiError apiError = this.configureApiError(ex.getMessage(), request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiError apiError = this.configureApiError(errors.toString(), request, errorStatus);
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