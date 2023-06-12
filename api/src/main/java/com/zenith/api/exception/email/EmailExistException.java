package com.zenith.api.exception.email;

public class EmailExistException extends Exception{

    public EmailExistException(String message) {
        super(message);
    }
}