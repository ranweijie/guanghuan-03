package com.hna.brightness.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Data Not Found")
public class DataNotFoundException extends RuntimeException {

    public DataNotFoundException(String message) {
        super(message);
    }

    public DataNotFoundException(IOException e) {
        super(e);
    }
}
