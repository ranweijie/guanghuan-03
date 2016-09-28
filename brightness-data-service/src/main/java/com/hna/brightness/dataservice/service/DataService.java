package com.hna.brightness.dataservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hna.brightness.dataservice.entity.BasicData;
import com.hna.brightness.dataservice.repository.BasicDataRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class DataService {

    @Autowired
    private BasicDataRepository dataRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public <T> BasicData saveData(T object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(object);
        Document document = Document.parse(json);
        BasicData basicData = new BasicData(document);
        BasicData updatedData = this.dataRepository.save(basicData);
        processRawDataForQuery(updatedData);
        return updatedData;
    }

    public void updateData(Map<String, Object> params) {
        Update update = new Update();
        for (String key : params.keySet()) {
            if (key.equals("id")) {
                continue;
            }
            update.set(key, params.get(key));
        }
        mongoTemplate.updateFirst(Query.query(where(("id")).is(params.get("id"))), update, BasicData.class);
    }

    public List<BasicData> find(String className, Map<String, Object> params) {
        Criteria where = where(("form_id")).is(className);
        for (String key : params.keySet()) {
            where = where.and(key).is(params.get(key));
        }
        List<BasicData> basicDatas = mongoTemplate.find(Query.query(where), BasicData.class);
        for (BasicData data : basicDatas) {
            processRawDataForQuery(data);
        }
        return basicDatas;
    }

    public void deleteData(String id){dataRepository.delete(new ObjectId(id));}

    public BasicData findById(String id) {
        BasicData data = this.dataRepository.findOne(new ObjectId(id));
        processRawDataForQuery(data);
        return data;
    }

    private void processRawDataForQuery(BasicData data) {
        if (data == null) {
            return;
        }
        if (data.containsKey("_id")) {
            data.put("id", data.get("_id").toString());
            data.remove("_id");

        } else if (!StringUtils.isEmpty(data.getId())) {
            data.put("id", data.getId());
        }
        if (data.containsKey("_class")) {
            data.remove("_class");
        }
    }
}
