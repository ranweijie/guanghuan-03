package com.hna.brightness.service;

import java.util.Map;

public class ProjectScheduleProcessor extends CriteriaProcessor {

    @Override
    public Map<String, Object> process(Map<String, Object> criteria) {
        Object category = criteria.get("category");
        if (category instanceof String) {
            Integer categoryValue = Integer.parseInt((String) category);
            criteria.put("category", categoryValue);
        }
        return criteria;
    }
}
