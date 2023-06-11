package com.zenith.api.exception;

import com.zenith.api.exception.email.EmailIsEmptyException;
import com.zenith.api.exception.email.EmailNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<ApiError> handleException(EmailNotFoundException e, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.NOT_FOUND;
        ApiError apiError = configureApiError(e, request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    @ExceptionHandler(EmailIsEmptyException.class)
    public ResponseEntity<ApiError> handleException(EmailIsEmptyException e, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;
        ApiError apiError = configureApiError(e, request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    private ApiError configureApiError(Exception e, HttpServletRequest request, HttpStatus errorStatus) {
        return new ApiError(
                request.getRequestURI(),
                e.getMessage(),
                errorStatus.value(),
                LocalDateTime.now()
        );
    }
}