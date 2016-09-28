package com.hna.brightness.data.extractor;

public abstract class RequestExtractor implements DataFormatCheckable {

    protected static final String PROJECT_STATUS_CHECK_ENDPOINT = "^/api/doc/(preparing|proceeding|archived|finished|cancelled)/project/([a-f0-9]{24})(/[^/]+)?(/[^/]+)?";
    protected static final String PROJECT_FIELD_STATUS_CHECK_ENDPOINT = "^/api/doc/(preparing|proceeding|archived|finished|cancelled)/project/(status|info|investigation|precheck|launch_ceremony|experience|finance|cured_numbers)/([a-f0-9]{24})";
    protected static final String PROJECT_NOT_CHECK_ENDPOINT = "^/api/doc/(basic_project|project)(/[^/]+)?";
    protected static final String FILES_ENDPOINT = "^/api/doc/files/(media|attachment)(/.*)?";

    protected Object bodyContent;

    protected String uri;

    public RequestExtractor(String uri) {
        this.uri = uri;
    }

    public static RequestExtractor createExecutor(String uri) {
        if (uri.matches(PROJECT_FIELD_STATUS_CHECK_ENDPOINT)) {
            return new ProjectFieldCheckableExtractor(uri);
        } else if (uri.matches(PROJECT_STATUS_CHECK_ENDPOINT)) {
            return new ProjectCheckableExtractor(uri);
        } else if (uri.matches(FILES_ENDPOINT)) {
            return new FileExtractor(uri);
        } else if (uri.matches(PROJECT_NOT_CHECK_ENDPOINT)) {
            return new DefaultExtractor(uri);
        }
        return null;
    }

    protected abstract void extract(String uri);

    public abstract boolean shouldFilter();

    public Object getBodyContent() {
        return bodyContent;
    }
}
