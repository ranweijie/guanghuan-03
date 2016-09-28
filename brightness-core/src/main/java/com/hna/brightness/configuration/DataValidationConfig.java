package com.hna.brightness.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableAutoConfiguration
@PropertySource("classpath:text_blacklist.properties")
public class DataValidationConfig {

    @Value("${text_with_space}")
    private String textWithSpace;

    @Value("${text_without_space}")
    private String textWithoutSpace;

    @Value("${special_characters}")
    private String specialCharacters;

    @Value("${text_exclude_for_get}")
    private String textExcludeForGet;

    public List<String> getBlackCharacters() {
        List<String> chars = new ArrayList<>();
        String[] arrayWithSpace = textWithSpace.split(",");
        String[] arrayWithoutSpace = textWithoutSpace.split("\\|");
        String[] arraySpecialCharacters = specialCharacters.split(",");

        for (String ch : arrayWithSpace) {
            chars.add(" " + ch + " ");
        }
        chars.addAll(Arrays.asList(arrayWithoutSpace));
        chars.addAll(Arrays.asList(arraySpecialCharacters));
        return chars;
    }

    public List<String> getBlackCharacterForGet() {
        List<String> chars = getBlackCharacters();
        String[] excludeChars = textExcludeForGet.split(",");
        for (String ch : excludeChars) {
            chars.remove(ch);
        }
        return chars;
    }
}