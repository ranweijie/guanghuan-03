package com.hna.brightness.api;

import com.hna.brightness.http.BasicResponse;
import com.hna.brightness.service.WordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/word")
public class WordController {

    @Autowired
    private WordService wordService;

    private static final Logger LOGGER = LoggerFactory.getLogger(WordController.class);

    @RequestMapping(value = "/{formId}/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void exportWordById(@PathVariable("formId") String formId, @PathVariable("id") String id, HttpServletResponse response) throws IOException {
        String fileName = "Word_" + System.currentTimeMillis() + ".docx";
        response.setContentType("application/octet-stream;charset=UTF-8");
        response.setHeader("pragma", "no-cache");
        response.setHeader("Content-disposition", "attachment; filename=" + fileName);
        wordService.createDoc(new BufferedOutputStream(response.getOutputStream()), formId, id);
    }

    @ExceptionHandler(IOException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    private ResponseEntity showError(IOException e) {
        LOGGER.error("IO error", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
