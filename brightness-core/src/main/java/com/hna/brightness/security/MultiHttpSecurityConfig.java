package com.hna.brightness.security;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

@EnableWebSecurity
public class MultiHttpSecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(MultiHttpSecurityConfig.class);

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthenticationProvider);
    }

    @Configuration
    public static class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

        @Autowired
        private CustomAuthenticationFilter customAuthenticationFilter;

        @Autowired
        private SecurityUtil securityUtil;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.sessionManagement().disable();
            http.securityContext().disable();
            http.addFilter(customAuthenticationFilter);
            ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = http
                    .csrf().disable()
                    .authorizeRequests();
            registry
                    .antMatchers("/api/token").permitAll()
                    .antMatchers("/api/token/**").permitAll()
                    .antMatchers("/wechat/bind-current-user").authenticated()
                    .antMatchers("/wechat/**").permitAll()
                    .antMatchers("/api/validation-code").permitAll()
                    .antMatchers("/api/validation-code/**").permitAll()
                    .antMatchers("/api/validation-code-for-test").permitAll()
                    .antMatchers("/api/validation-code-for-test/**").permitAll()
            ;
            readCsv(registry);
            registry.anyRequest().authenticated();
            http.exceptionHandling().authenticationEntryPoint(unauthorizedEntryPoint());
        }

        private void readCsv(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry) throws Exception {
            CsvMapper mapper = new CsvMapper();
            CsvSchema schema = CsvSchema.emptySchema().withHeader();
            try {
                MappingIterator<Map<String, String>> it = mapper.readerFor(Map.class).with(schema).readValues(new FileInputStream(new ClassPathResource("/privilege.csv").getFile()));
                while (it.hasNext()) {
                    Map<String, String> rowAsMap = it.next();
                    if (rowAsMap.isEmpty() || !rowAsMap.containsKey("method")) {
                        continue;
                    }
                    String method = rowAsMap.get("method");
                    String url = rowAsMap.get("url");
                    String roles = rowAsMap.get("roles");
                    logger.info("privilege[method|url|role]: {}|{}|{}", method, url, roles);
                    registry = registry.regexMatchers(HttpMethod.valueOf(method), url).hasAnyRole(roles.split(";"));
                }
            } catch (IOException e) {
                logger.error("Read privilege csv error.", e);
            }
        }

        @Bean
        public AuthenticationEntryPoint unauthorizedEntryPoint() {
            return (request, response, authException) -> {
                SecurityContext securityContext = securityUtil.getSecurityContext(request.getHeader("Authorization"));
                Authentication authentication = securityContext.getAuthentication();
                if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() == null) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN);
                }
            };
        }
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
