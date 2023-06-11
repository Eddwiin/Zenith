package com.zenith.api.exception.email;

public class EmailIsEmptyException extends Exception{
    public EmailIsEmptyException(String message) {
        super(message);
    }
}