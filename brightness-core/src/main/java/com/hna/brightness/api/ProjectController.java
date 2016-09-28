package com.hna.brightness.api;

import com.hna.brightness.dataservice.entity.BasicData;
import com.hna.brightness.dataservice.service.DataService;
import com.hna.brightness.entity.DataType;
import com.hna.brightness.entity.ProjectBasicInfo;
import com.hna.brightness.exception.DataNotFoundException;
import com.hna.brightness.http.BasicResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private static final String DEFAULT_PROJECT_ID = "201601";

    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private DataService dataService;

    @RequestMapping("/current-project")
    public ProjectBasicInfo getCurrentProject(@CookieValue(name = "currentProjectId", required = false) String currentProjectId) throws DataNotFoundException {
        if (StringUtils.isEmpty(currentProjectId)) {
            currentProjectId = DEFAULT_PROJECT_ID;
        }
        Map<String, Object> params = new HashMap<>();
        params.put("project_id", currentProjectId);
        List<BasicData> basicDatas = dataService.find(DataType.PROJECT.getValue(), params);
        if (basicDatas == null || basicDatas.size() == 0) {
            LOGGER.info("Project [id={}] not found", currentProjectId);
            throw new DataNotFoundException("Project not found");
        }
        return new ProjectBasicInfo(basicDatas.get(0));
    }

    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private ResponseEntity showError(AuthenticationException e) {
        BasicResponse response = new BasicResponse(HttpStatus.NOT_FOUND.value(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
