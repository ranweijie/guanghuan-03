package com.hna.brightness.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hna.brightness.dataservice.entity.BasicData;
import com.hna.brightness.dataservice.service.DataService;
import com.hna.brightness.entity.DataType;
import com.hna.brightness.entity.ProjectBasicInfo;
import com.hna.brightness.exception.DataNotFoundException;
import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.http.BasicResponse;
import com.hna.brightness.service.CriteriaProcessor;
import com.hna.brightness.service.DataValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataController.class);

    @Autowired
    private DataService dataService;

    @Autowired
    private DataValidator dataValidator;

    @RequestMapping(value = "/{formId}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public BasicData saveData(@PathVariable String formId, @RequestBody Map<String, Object> params) throws FormValidationException, DataNotFoundException {
        try {
            dataValidator.check(params);
            params.put("form_id", formId);
            params.put("_class", formId);
            return this.dataService.saveData(params);
        } catch (JsonProcessingException e) {
            LOGGER.error("error occurs while transforming data into object.", e);
        }
        throw new DataNotFoundException("data_not_found");
    }

    @RequestMapping("/basic_project")
    public List<ProjectBasicInfo> getBasicProject() {
        List<BasicData> basicDatas = dataService.find(DataType.PROJECT.getValue(), new HashMap<>());
        if (basicDatas == null || basicDatas.size() == 0) {
            LOGGER.info("Project not found");
            return new ArrayList<>();
        }
        return ProjectBasicInfo.convertData(basicDatas);
    }

    @RequestMapping(value = "/{formId}/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateData(@PathVariable String formId, @PathVariable("id") String id, @RequestBody Map<String, Object> params) throws FormValidationException {
        dataValidator.check(params);
        params.put("id", id);
        this.dataService.updateData(params);
    }

    @RequestMapping(value = "/{formId}/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteData(@PathVariable String formId, @PathVariable("id") String id){
        this.dataService.deleteData(id);
    }

    @RequestMapping(value = "/{formId}", method = RequestMethod.GET)
    public List<BasicData> getDataList(@PathVariable String formId, @RequestParam Map<String, Object> params) throws FormValidationException {
        params = CriteriaProcessor.processCriteria(formId, params);
        this.dataValidator.checkForGet(params);
        return this.dataService.find(formId, params);
    }

    @RequestMapping(value = "/{formId}/{id}", method = RequestMethod.GET)
    public List<BasicData> getData(@PathVariable String formId, @PathVariable("id") String id) throws FormValidationException {
        List<BasicData> result = new ArrayList<>();
        result.add(this.dataService.findById(id));
        return result;
    }

    @ExceptionHandler(FormValidationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    private ResponseEntity showError(FormValidationException e) {
        LOGGER.error("Input validation error", e.getMessage());
        BasicResponse response = new BasicResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private ResponseEntity showNoDataError(DataNotFoundException e) {
        LOGGER.error("data not found", e.getMessage());
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
