package com.hna.brightness.entity;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

public enum DataType {

    PROJECT("project"),
    PROJECT_PROGRESS("project_progress"),
    PROJECT_SCHEDULE("project_schedule");

    private String value;

    private DataType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    private static Map<String, DataType> valueMap = new HashMap<>();
    static {
        for (DataType type : DataType.values()) {
            valueMap.put(type.getValue(), type);
        }
    }

    public static DataType fromValue(String value) {
        DataType dataType = valueMap.get(value);
        if (dataType == null) {
            throw new NoSuchElementException("No element for \"" + value + "\".");
        }
        return dataType;
    }
}
