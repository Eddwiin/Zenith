package com.zenith.api.exception;

import com.zenith.api.exception.email.EmailEmptyException;
import com.zenith.api.exception.email.EmailExistException;
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

    @ExceptionHandler(EmailEmptyException.class)
    public ResponseEntity<ApiError> handleException(EmailEmptyException e, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;
        ApiError apiError = configureApiError(e, request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    @ExceptionHandler(EmailExistException.class)
    public ResponseEntity<ApiError> handleException(EmailExistException e, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.FORBIDDEN;
        ApiError apiError = this.configureApiError(e, request, errorStatus);

        return new ResponseEntity<>(apiError, errorStatus);
    }

    @ExceptionHandler(SaveMemberArgsIncorrectException.class)
    public ResponseEntity<ApiError> handleException(SaveMemberArgsIncorrectException e, HttpServletRequest request) {
        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;
        ApiError apiError = this.configureApiError(e, request, errorStatus);

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