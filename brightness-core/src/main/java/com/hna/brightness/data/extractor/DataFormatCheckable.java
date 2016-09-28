package com.hna.brightness.data.extractor;

public interface DataFormatCheckable extends DataExtractable {
    boolean isParamCheckable();
    boolean isBodyCheckable();

}
