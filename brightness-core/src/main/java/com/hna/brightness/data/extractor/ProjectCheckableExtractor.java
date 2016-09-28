package com.hna.brightness.data.extractor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hna.brightness.exception.DataNotFoundException;
import com.hna.brightness.exception.StatusNotMatchException;
import com.hna.brightness.http.BasicResponse;
import com.hna.brightness.http.HttpClient;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.Map;

public class ProjectCheckableExtractor extends DefaultExtractor implements VisibilityCheckable {

    protected String status;
    protected String projectId;
    private String dataServiceHost;

    public ProjectCheckableExtractor(String uri) {
        super(uri);
    }

    @Override
    protected void extract(String uri) {
        this.status = uri.replaceAll(PROJECT_STATUS_CHECK_ENDPOINT, "$1");
        this.projectId = uri.replaceAll(PROJECT_STATUS_CHECK_ENDPOINT, "$2");
    }

    @Override
    public void check() {
        extract(uri);
        String actualStatus = fetchProjectStatus(projectId);
        if (!this.status.equals(actualStatus)) {
            throw new StatusNotMatchException("status_not_match");
        }
    }

    @Override
    public void setDataServiceHost(String basicUrl) {
        dataServiceHost = basicUrl;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    private String fetchProjectStatus(String projectId) {
        try {
            String url = dataServiceHost + "/project/status/" + projectId;
            HttpClient httpClient = new HttpClient(url, "GET");
            BasicResponse response = httpClient.get();
            if (response.getErrorCode() == HttpStatus.NOT_FOUND.value()) {
                throw new DataNotFoundException("no_data");
            }
            String statusContent = response.getMessage();

            ObjectMapper objectMapper = new ObjectMapper();
            Map statusValueMap = objectMapper.readValue(statusContent, Map.class);
            return (String) statusValueMap.get("status");
        } catch (IOException e) {
            throw new DataNotFoundException("no_data");
        }
    }

    @Override
    public boolean isParamCheckable() {
        return false;
    }

    @Override
    public boolean isBodyCheckable() {
        return true;
    }
}
