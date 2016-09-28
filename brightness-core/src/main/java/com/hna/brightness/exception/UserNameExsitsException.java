package com.hna.brightness.exception;

public class UserNameExsitsException extends Exception {
    public UserNameExsitsException() {
    }

    public UserNameExsitsException(String message) {
        super(message);
    }

    public UserNameExsitsException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNameExsitsException(Throwable cause) {
        super(cause);
    }
}
