package com.zenith.api.exception.email;

public class EmailEmptyException extends Exception{
    public EmailEmptyException(String message) {
        super(message);
    }
}