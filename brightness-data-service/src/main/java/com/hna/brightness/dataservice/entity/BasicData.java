package com.hna.brightness.dataservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@org.springframework.data.mongodb.core.mapping.Document(collection = "data")
public class BasicData extends org.bson.Document {

    @Id
    private ObjectId id;

    public BasicData(Document document) {
        this.putAll(document);
    }

    /**
     * Creates an empty Document instance.
     */
    public BasicData() {
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    @JsonProperty
    public String getId() {
        if (this.containsKey("id")) {
            return (String) this.get("id");
        }
        return id.toString();
    }

    @JsonIgnore
    public ObjectId getObjectId() {
        return id;
    }
}
