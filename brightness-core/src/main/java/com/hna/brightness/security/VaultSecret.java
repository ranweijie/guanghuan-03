package com.hna.brightness.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VaultSecret {
    @JsonProperty("lease_id")
    private String leaseId;
    @JsonProperty("renewable")
    private Boolean renewable;
    @JsonProperty("lease_duration")
    private Long leaseDuration;
    @JsonProperty("data")
    private Data data;
    @JsonProperty("warnings")
    private Object warnings;
    @JsonProperty("auth")
    private Object auth;
    public class Data {
        @JsonProperty("value")
        private String value;

        public String getValue() {
            return value;
        }
    }

    public Data getData() {
        return data;
    }
}
