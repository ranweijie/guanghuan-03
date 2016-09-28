package com.hna.brightness.data.extractor;

import javax.servlet.ServletInputStream;
import java.io.IOException;

public interface DataExtractable {
    Object extractRequestBody(ServletInputStream inputStream) throws IOException;
}
