package com.hna.brightness.data.extractor;

import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.service.DataValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

public class DataFormatChecker {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataFormatChecker.class);

    private DataValidator validator;
    private DataFormatCheckable checkableExtractor;

    public DataFormatChecker(DataFormatCheckable checkableExtractor) {
        this.checkableExtractor = checkableExtractor;
    }

    public void setValidator(DataValidator validator) {
        this.validator = validator;
    }

    public void checkDataFormat(HttpServletRequest request) throws FormValidationException, IOException {
        if (checkableExtractor.isBodyCheckable()) {
            checkBodyContent(request);
        }
        if (checkableExtractor.isParamCheckable()) {
            checkParams(request);
        }
    }

    private void checkParams(HttpServletRequest request) throws FormValidationException {
        Map<String, String[]> parameterMap = request.getParameterMap();
        for (String paramName : parameterMap.keySet()) {
            String[] values = parameterMap.get(paramName);
            if (values != null && values.length > 0) {
                validator.check(Arrays.asList(values));
            }
        }
    }

    private void checkBodyContent(HttpServletRequest request) throws FormValidationException, IOException {
        String contentType = request.getHeader("content-type");
        if (!StringUtils.isEmpty(contentType) && contentType.contains("multipart/form-data")) {
            LOGGER.info("request body is file uploaded, skip character validation.");
            return;
        }
        Object bodyContent = this.checkableExtractor.extractRequestBody(request.getInputStream());
        if (bodyContent == null) {
            return;
        }
        validator.check(bodyContent);
    }
}