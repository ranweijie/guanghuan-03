package com.hna.brightness.data;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;

public class DataNotFoundFilter extends ZuulFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataNotFoundFilter.class);

    @Override
    public String filterType() {
        return "post";
    }

    @Override
    public int filterOrder() {
        return -1;
    }

    @Override
    public boolean shouldFilter() {
        RequestContext ctx = RequestContext.getCurrentContext();
        disableErrorForwarding(ctx);
        return ctx.getResponseStatusCode() == HttpServletResponse.SC_NOT_FOUND;
    }

    private void skipOperation(RequestContext requestContext) {
        requestContext.setZuulEngineRan();
        requestContext.setResponseBody("{}");
        requestContext.setResponseStatusCode(200);
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        skipOperation(ctx);
        return null;
    }

    private void disableErrorForwarding(RequestContext ctx) {
        ctx.remove("error.status_code");
    }
}
