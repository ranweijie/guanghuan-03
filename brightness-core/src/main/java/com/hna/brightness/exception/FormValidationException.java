package com.hna.brightness.exception;

public class FormValidationException extends Exception {
    public FormValidationException() {
    }

    public FormValidationException(String message) {
        super(message);
    }

    public FormValidationException(String message, Throwable cause) {
        super(message, cause);
    }

    public FormValidationException(Throwable cause) {
        super(cause);
    }
}
