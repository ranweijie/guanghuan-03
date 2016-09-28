package com.hna.brightness.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hna.brightness.dataservice.entity.BasicData;
import com.hna.brightness.exception.DataTypeNotMatchException;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProjectBasicInfo {

    private String id;
    @JsonProperty("project_id")
    private String projectId;
    private String name;
    private String location;
    private String status;
    private Map<String, Object> schedule;

    public ProjectBasicInfo(BasicData data) {
        if (StringUtils.isEmpty(data.get("form_id")) || !data.get("form_id").equals(DataType.PROJECT.getValue())) {
            throw new DataTypeNotMatchException("Cannot convert data from \"" + data.get("form_id") + "\" to project.");
        }
        this.projectId = (String) data.get("project_id");
        this.name = (String) data.get("name");
        this.location = (String) data.get("location");
        this.schedule = (Map<String, Object>) data.get("schedule");
        this.id = (String) data.get("id");
        if(!StringUtils.isEmpty(data.get("status")))this.status = (String) data.get("status");
    }

    public static List<ProjectBasicInfo> convertData(List<BasicData> datas){
        List<ProjectBasicInfo> list = new ArrayList<>();
        for (BasicData data: datas){
            ProjectBasicInfo info = new ProjectBasicInfo(data);
            list.add(info);
        }
        return list;
    }

    public String getProjectId() {
        return projectId;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getStatus() {
        return status;
    }

    public Map<String, Object> getSchedule() {
        return schedule;
    }

    public String getId() {
        return id;
    }
}
