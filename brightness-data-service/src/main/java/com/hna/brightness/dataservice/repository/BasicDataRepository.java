package com.hna.brightness.dataservice.repository;

import com.hna.brightness.dataservice.entity.BasicData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BasicDataRepository extends MongoRepository<BasicData, ObjectId> {

}
