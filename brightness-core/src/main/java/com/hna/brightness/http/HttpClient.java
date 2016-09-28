package com.hna.brightness.http;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HttpClient {

    private String url;
    private String method;
    private HttpHeaders headers;

    public HttpClient(String url, String method) {
        this.url = url;
        this.method = method;
        this.headers = new HttpHeaders();
    }

    public void addHeader(String key, String value) {
        List<String> values = this.headers.get(key);
        if (values == null) {
            values = new ArrayList<String>();
        }
        values.add(value);
        this.headers.put(key, values);
    }

    public BasicResponse post(Map<String, Object> params) throws IOException {
        return sendRequest(params);
    }

    public BasicResponse get() throws IOException {
        return sendRequest(null);
    }

    private BasicResponse sendRequest(Map<String, Object> params) throws IOException {
        URL urlObject = new URL(this.url);
        HttpURLConnection connection = (HttpURLConnection) urlObject.openConnection();
        try {
            connection.setRequestMethod(this.method);
            addHeaders(connection);
            if (!"GET".equals(this.method)) {
                connection.setDoOutput(true);
                writeParams(connection.getOutputStream(), params);
            }
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpStatus.OK.value()) {
                InputStream connectionInputStream = connection.getInputStream();
                String result = readInputStream(connectionInputStream);
                connection.disconnect();
                return new BasicResponse(HttpStatus.OK.value(), result);
            }
            return new BasicResponse(responseCode, "other");
        } finally {
            connection.disconnect();
        }
    }

    private void addHeaders(HttpURLConnection connection) {
        if (this.headers == null || this.headers.size() == 0) {
            return;
        }
        for (String key : this.headers.keySet()) {
            List<String> values = this.headers.get(key);
            for (String value : values) {
                connection.addRequestProperty(key, value);
            }
        }
    }

    private static String readInputStream(InputStream connectionInputStream) throws IOException {
        BufferedReader in = new BufferedReader(
                new InputStreamReader(connectionInputStream));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        return response.toString();
    }

    private static void writeParams(OutputStream outputStream, Map<String, Object> params) throws IOException {
        DataOutputStream wr = new DataOutputStream(outputStream);
        StringBuilder param = new StringBuilder();
        for (String key : params.keySet()) {
            param.append("&").append(key).append("=").append(params.get(key));
        }
        if (param.toString().startsWith("&")) {
            param = param.replace(0, 1, "");
        }
        wr.writeBytes(param.toString());
        wr.flush();
        wr.close();
    }
}
