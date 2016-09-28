package com.hna.brightness.data.extractor;

public class ProjectFieldCheckableExtractor extends ProjectCheckableExtractor {

    public ProjectFieldCheckableExtractor(String uri) {
        super(uri);
    }

    @Override
    protected void extract(String uri) {
        this.status = uri.replaceAll(PROJECT_FIELD_STATUS_CHECK_ENDPOINT, "$1");
        this.projectId = uri.replaceAll(PROJECT_FIELD_STATUS_CHECK_ENDPOINT, "$3");
    }
}
