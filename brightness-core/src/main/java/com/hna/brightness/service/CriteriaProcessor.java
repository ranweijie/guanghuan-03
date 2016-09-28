package com.hna.brightness.service;

import com.hna.brightness.entity.DataType;

import java.util.Map;
import java.util.NoSuchElementException;

public abstract class CriteriaProcessor {

    public abstract Map<String, Object> process(Map<String, Object> criteria);

    private static CriteriaProcessor getProcessor(String formId) {
        DataType dataType;
        try {
            dataType = DataType.fromValue(formId);
        } catch (NoSuchElementException e) {
            return null;
        }

        switch (dataType) {
            case PROJECT_SCHEDULE:
                return new ProjectScheduleProcessor();
            default:
                return null;
        }
    }

    public static Map<String, Object> processCriteria(String formId, Map<String, Object> criteria) {
        try {
            CriteriaProcessor processor = getProcessor(formId);
            if (processor != null) {
                criteria = processor.process(criteria);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
        return criteria;
    }
}
