package com.hna.brightness.data.extractor;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.servlet.ServletInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

public class DefaultExtractor extends RequestExtractor {

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultExtractor.class);

    public DefaultExtractor(String uri) {
        super(uri);
    }

    @Override
    protected void extract(String uri) {

    }

    @Override
    public boolean shouldFilter() {
        return false;
    }

    @Override
    public Object extractRequestBody(ServletInputStream inputStream) throws IOException {
        String content = getRequestBody(inputStream);
        if (StringUtils.isEmpty(content)) {
            return null;
        }
        if (content.trim().startsWith("{")) {
            this.bodyContent = convertRequestBodyToMap(content);
        } else if (content.trim().startsWith("[")) {
            this.bodyContent = convertRequestBodyToList(content.trim());
        }
        return this.bodyContent;
    }

    @Override
    public boolean isParamCheckable() {
        return false;
    }

    @Override
    public boolean isBodyCheckable() {
        return true;
    }

    private String getRequestBody(ServletInputStream inputStream) throws IOException {
        if (inputStream == null) {
            return null;
        }
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String content = stringBuilder.toString();
        if (!content.trim().equals("")) {
            return content;
        }
        return null;
    }

    private Map<String, Object> convertRequestBodyToMap(String content) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(content.getBytes("UTF-8"), Map.class);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }

    private List convertRequestBodyToList(String content) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(content.getBytes("UTF-8"), List.class);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }
}
