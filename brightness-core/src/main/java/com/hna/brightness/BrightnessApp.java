package com.hna.brightness;

import com.hna.brightness.configuration.ApplicationConfiguration;
import com.hna.brightness.data.DataFilter;
import com.hna.brightness.data.DataNotFoundFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import java.io.IOException;
import java.util.Properties;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@EnableZuulProxy
public class BrightnessApp extends SpringBootServletInitializer {

    private static final Logger LOGGER = LoggerFactory.getLogger(BrightnessApp.class);

    public static void main(String[] args) throws IOException {
        SpringApplication application = new SpringApplication(BrightnessApp.class);
        String profile = System.getenv("SPRING_PROFILES_ACTIVE");
        ConfigurableEnvironment environment = new StandardEnvironment();
        environment.setActiveProfiles(profile);
        Properties properties = ApplicationConfiguration.loadProperties(profile);
        environment.getPropertySources().addFirst(new PropertiesPropertySource("vault", properties));
        application.setEnvironment(environment);
        application.run(args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        try {
            String profile = System.getenv("SPRING_PROFILES_ACTIVE");
            LOGGER.info("profile: {}", profile);
            ConfigurableEnvironment environment = new StandardEnvironment();
            environment.setActiveProfiles(profile);
            Properties properties = ApplicationConfiguration.loadProperties(profile);
            environment.getPropertySources().addFirst(new PropertiesPropertySource("vault", properties));
            application.environment(environment);
        } catch (IOException e) {
            LOGGER.error("error occurs while loading properties.", e);
        }
        return application.sources(applicationClass);
    }

    private static Class<BrightnessApp> applicationClass = BrightnessApp.class;

    @Bean
    public RedisTemplate userTokenTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate template = new RedisTemplate();
        template.setConnectionFactory(connectionFactory);
        template.afterPropertiesSet();
        return template;
    }

    @Bean
    public DataFilter getDataFilter() {
        return new DataFilter();
    }

    @Bean
    public DataNotFoundFilter getDataNotFoundFilter() {
        return new DataNotFoundFilter();
    }

}
