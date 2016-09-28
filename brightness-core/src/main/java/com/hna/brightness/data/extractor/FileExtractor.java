package com.hna.brightness.data.extractor;

import javax.servlet.ServletInputStream;

public class FileExtractor extends DefaultExtractor {

    public FileExtractor(String uri) {
        super(uri);
    }

    @Override
    public Object extractRequestBody(ServletInputStream inputStream) {
        return null;
    }

    @Override
    public boolean isBodyCheckable() {
        return false;
    }

}
