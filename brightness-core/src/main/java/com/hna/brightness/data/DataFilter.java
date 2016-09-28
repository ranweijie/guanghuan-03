package com.hna.brightness.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hna.brightness.data.extractor.RequestExtractor;
import com.hna.brightness.data.extractor.VisibilityCheckable;
import com.hna.brightness.exception.DataNotFoundException;
import com.hna.brightness.exception.FormValidationException;
import com.hna.brightness.exception.StatusNotMatchException;
import com.hna.brightness.http.BasicResponse;
import com.hna.brightness.service.DataValidator;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class DataFilter extends ZuulFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataFilter.class);

    @Value("${zuul_basic_url}")
    private String dataServiceHost;

    @Autowired
    private DataValidator dataValidator;

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        RequestContext requestContext = RequestContext.getCurrentContext();
        HttpServletRequest request = requestContext.getRequest();
        String uri = request.getRequestURI();
        try {
            RequestExtractor requestExtractor = RequestExtractor.createExecutor(uri);
            LOGGER.info("uri: {}, extractor: {}", uri, requestExtractor != null ? requestExtractor.getClass().getSimpleName() : "null");
            if (requestExtractor == null) {
                throw new DataNotFoundException("no_data");
            }

            if (requestExtractor instanceof VisibilityCheckable) {
                VisibilityCheckable checkableExtractor = (VisibilityCheckable) requestExtractor;
                checkableExtractor.setDataServiceHost(dataServiceHost);
                checkableExtractor.check();
            }

            Object requestBody = requestExtractor.extractRequestBody(request.getInputStream());
            if (requestBody != null) {
                requestBody = filterParams((Map<String, Object>) requestBody);
                if (requestExtractor.isBodyCheckable()) {
                    dataValidator.check(requestBody);
                } else if (requestExtractor.isParamCheckable()) {
                    dataValidator.check(request.getParameterMap());
                }
            }

            return true;
        } catch (Throwable e) {
            LOGGER.error(e.getMessage(), e);
            skipOperation(requestContext, e);
        }
        return false;
    }

    private Map<String, Object> filterParams(Map<String, Object> valueMap) {
        valueMap.remove("_created");
        valueMap.remove("_updated");
        valueMap.remove("_links");
        valueMap.remove("_meta");
        return valueMap;
    }

    private int getStatusCode(Throwable e) {
        if (e instanceof DataNotFoundException) {
            return HttpServletResponse.SC_NOT_ACCEPTABLE;
        } else if (e instanceof StatusNotMatchException) {
            return HttpServletResponse.SC_NOT_ACCEPTABLE;
        } else if (e instanceof FormValidationException) {
            return HttpStatus.UNPROCESSABLE_ENTITY.value();
        } else {
            return HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
        }
    }

    private void skipOperation(RequestContext requestContext, Throwable throwable) {
        requestContext.setThrowable(throwable);
        requestContext.setSendZuulResponse(false);
        BasicResponse response = new BasicResponse(getStatusCode(throwable), throwable.getMessage());
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            requestContext.setResponseBody(objectMapper.writeValueAsString(response));
        } catch (JsonProcessingException e) {
            requestContext.setResponseBody("{}");
        }
        requestContext.setResponseStatusCode(getStatusCode(throwable));
    }

    @Override
    public Object run() {
        return null;
    }


}
