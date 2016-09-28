package com.hna.brightness.entity;

import java.util.HashMap;
import java.util.Map;

public enum WordTemplateType {

    LAUNCH("launch_ceremony", "launch_ceremony_template.ftl"),
    PROJECT("project", "project_template.ftl"),
    CHECK("check_before_operation", "check_before_operation_template.ftl"),
    SCHEDULE("project_schedule","project_schedule_template.ftl"),
    TEAM_CONTRACT("team_contact","team_contact_template.ftl");

    private String formId;
    private String ftl;

    WordTemplateType(String formId, String ftl) {
        this.formId = formId;
        this.ftl = ftl;
    }

    public String getFormId() {
        return formId;
    }

    public String getFtl() {
        return ftl;
    }

    private static Map<String, WordTemplateType> valueMap = new HashMap<>();

    static {
        for (WordTemplateType type : WordTemplateType.values()) {
            valueMap.put(type.getFormId(), type);
        }
    }

    public static WordTemplateType fromFormId(String value) {
        return valueMap.get(value);
    }
}
