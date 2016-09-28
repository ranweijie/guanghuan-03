package com.hna.brightness.dataservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.hna.brightness.dataservice.repository")
public class BrightnessDataServiceApp {
    public static void main(String[] args) {
        SpringApplication.run(BrightnessDataServiceApp.class, args);
    }
}
