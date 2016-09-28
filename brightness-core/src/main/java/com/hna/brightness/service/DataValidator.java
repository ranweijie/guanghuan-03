package com.hna.brightness.service;

import com.hna.brightness.configuration.DataValidationConfig;
import com.hna.brightness.exception.FormValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class DataValidator {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataValidator.class);

    @Autowired
    private DataValidationConfig dataValidationConfig;

    public void check(Object param) throws FormValidationException {
        List<String> blackCharList = this.dataValidationConfig.getBlackCharacters();
        check(param, blackCharList);
    }

    public void checkForGet(Object param) throws FormValidationException {
        List<String> blackCharList = this.dataValidationConfig.getBlackCharacterForGet();
        check(param, blackCharList);
    }

    private void checkMap(Map<String, Object> params, List<String> blackList) throws FormValidationException {
        for (String key : params.keySet()) {
            check(params.get(key), blackList);
        }
    }

    private void check(Object param, List<String> blackList) throws FormValidationException {
        if (param instanceof String) {
            checkText((String) param, blackList);
        } else if (param instanceof Map) {
            checkMap((Map<String, Object>) param, blackList);
        } else if (param instanceof List) {
            checkList((List) param, blackList);
        } else if (param instanceof String[]) {
            checkList(Arrays.asList((String[]) param), blackList);
        }
    }

    private void checkText(String inputText, List<String> blackList) throws FormValidationException {
        for (String blackChar : blackList) {
            if (!StringUtils.isEmpty(blackChar) && !StringUtils.isEmpty(inputText) && inputText.toLowerCase().contains(blackChar)) {
                LOGGER.info("input text \"{}\" contains invalid character: {}", inputText, blackChar);
                throw new FormValidationException("illegal_character");
            }
        }
    }

    private void checkList(List<Object> params, List<String> blackList) throws FormValidationException {
        for (Object param : params) {
            check(param, blackList);
        }
    }
}
