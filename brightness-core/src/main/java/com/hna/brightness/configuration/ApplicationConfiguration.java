package com.hna.brightness.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hna.brightness.http.HttpClient;
import com.hna.brightness.security.VaultSecret;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

@Configuration
@EnableAutoConfiguration
public class ApplicationConfiguration {

    private static final String VAULT_PATH_PRIX = "v1/secret/HNA-Brightness";
    private static final String MYSQL_PWD_PATH = "mysql/hnauser";
    private static final String MONGO_URL_PATH = "mongo/url";
    private static final String REDIS_PASSWORD_PATH = "redis";
    private static final String WECHAT_CLIENT_SECRET_PATH = "wechat_client_secret";
    private static final String WECHAT_CLIENT_ID_PATH = "wechat_client_id";
    private static final String ATTACHMENT_LOCATION_PATH = "attachment/location";
    private static final String DOMAIN_URL_PATH = "domain/url";

    @Bean(name = "appConfig", autowire = Autowire.BY_NAME)
    @Profile("dev")
    public Properties devProp() throws IOException {
        Properties properties = new Properties();
        String vaultPath = this.getVaultPath() + "/dev/";
        String vaultToken = this.getVaultToken();
        properties.put("spring.datasource.password", readVaultValue(vaultPath, MYSQL_PWD_PATH, vaultToken));
        properties.put("spring.data.mongodb.uri", readVaultValue(vaultPath, MONGO_URL_PATH, vaultToken));
        properties.put("wechat_client_id", readVaultValue(vaultPath, WECHAT_CLIENT_ID_PATH, vaultToken));
        properties.put("wechat_client_secret", readVaultValue(vaultPath, WECHAT_CLIENT_SECRET_PATH, vaultToken));
        properties.put("attachment.location", readVaultValue(vaultPath, ATTACHMENT_LOCATION_PATH, vaultToken));
        properties.put("wechat_domain", readVaultValue(vaultPath, DOMAIN_URL_PATH, vaultToken));
        return properties;
    }

    @Bean(name = "appConfig", autowire = Autowire.BY_NAME)
    @Profile("test")
    public Properties testProp() throws IOException {
        Properties properties = new Properties();
        String vaultPath = ApplicationConfiguration.this.getVaultPath() + "/test/";
        String vaultToken = ApplicationConfiguration.this.getVaultToken();
        properties.put("spring.datasource.password", readVaultValue(vaultPath, MYSQL_PWD_PATH, vaultToken));
        properties.put("spring.data.mongodb.uri", readVaultValue(vaultPath, MONGO_URL_PATH, vaultToken));
        properties.put("wechat_client_id", readVaultValue(vaultPath, WECHAT_CLIENT_ID_PATH, vaultToken));
        properties.put("wechat_client_secret", readVaultValue(vaultPath, WECHAT_CLIENT_SECRET_PATH, vaultToken));
        properties.put("attachment.location", readVaultValue(vaultPath, ATTACHMENT_LOCATION_PATH, vaultToken));
        properties.put("wechat_domain", readVaultValue(vaultPath, DOMAIN_URL_PATH, vaultToken));
        return properties;
    }

    @Bean(name = "appConfig", autowire = Autowire.BY_NAME)
    @Profile("prod")
    public Properties prodProp() throws IOException {
        Properties properties = new Properties();
        String vaultPath = ApplicationConfiguration.this.getVaultPath() + "/prod/";
        String vaultToken = ApplicationConfiguration.this.getVaultToken();
        properties.put("spring.datasource.password", readVaultValue(vaultPath, MYSQL_PWD_PATH, vaultToken));
        properties.put("spring.data.mongodb.uri", readVaultValue(vaultPath, MONGO_URL_PATH, vaultToken));
        properties.put("spring.redis.password", readVaultValue(vaultPath, REDIS_PASSWORD_PATH, vaultToken));
        properties.put("wechat_client_id", readVaultValue(vaultPath, WECHAT_CLIENT_ID_PATH, vaultToken));
        properties.put("wechat_client_secret", readVaultValue(vaultPath, WECHAT_CLIENT_SECRET_PATH, vaultToken));
        properties.put("attachment.location", readVaultValue(vaultPath, ATTACHMENT_LOCATION_PATH, vaultToken));
        properties.put("wechat_domain", readVaultValue(vaultPath, DOMAIN_URL_PATH, vaultToken));
        return properties;
    }

    @Bean(name = "appConfig", autowire = Autowire.BY_NAME)
    @Profile("local")
    public Properties localProp() throws IOException {
        ClassPathResource baseResource = new ClassPathResource("/application.properties");
        ClassPathResource localResource = new ClassPathResource("/application-local.properties");
        Properties props = PropertiesLoaderUtils.loadProperties(baseResource);
        Properties localProps = PropertiesLoaderUtils.loadProperties(localResource);
        props.putAll(localProps);
        props.put("checkValidationCode", false);
        return props;
    }

    private String getVaultPath() {
        return System.getenv("VAULT_ADDR") + VAULT_PATH_PRIX;
    }

    private String getVaultToken() {
        return System.getenv("VAULT_TOKEN");
    }

    private static String readVaultValue(String url, String valuePath, String token) throws IOException {
        HttpClient httpClient = new HttpClient(url + valuePath, "GET");
        httpClient.addHeader("X-Vault-Token", token);
        String secretJson = httpClient.get().getMessage();
        ObjectMapper objectMapper = new ObjectMapper();
        VaultSecret vaultSecret = objectMapper.readValue(secretJson, VaultSecret.class);
        return vaultSecret.getData().getValue();
    }

    public static Properties loadProperties(String profile) throws IOException {
        ApplicationConfiguration configuration = new ApplicationConfiguration();
        switch (profile) {
            case "local":
                return configuration.localProp();
            case "dev":
                return configuration.devProp();
            case "test":
                return configuration.testProp();
            case "prod":
                return configuration.prodProp();
        }
        return null;
    }
}
