package com.zenith.api.exception.email;

public class EmailNotFoundException extends Exception {
    EmailNotFoundException(String message) {
        super(message);
    }

    public EmailNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}