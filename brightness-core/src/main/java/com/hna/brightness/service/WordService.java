package com.hna.brightness.service;

import com.hna.brightness.dataservice.service.DataService;
import com.hna.brightness.entity.WordTemplateType;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Map;

/**
 * Created by sliang on 16/6/24.
 */
@Component
public class WordService {

    private Configuration configuration = null;

    private static final Logger LOGGER = LoggerFactory.getLogger(WordService.class);

    @Value("${templatePath}")
    private String templatePath;

    @Autowired
    private DataService dataService;

    public WordService() {
        configuration = new Configuration(Configuration.VERSION_2_3_24);
        configuration.setDefaultEncoding("utf-8");
    }

    public void createDoc(BufferedOutputStream outputStream, String formId, String id) throws IOException {
        Map<String, Object> dataMap = dataService.findById(id);
        Writer out = null;
        try {
            configuration.setDirectoryForTemplateLoading(new ClassPathResource(templatePath).getFile());
            Template t = configuration.getTemplate(WordTemplateType.fromFormId(formId).getFtl());
            out = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
            t.process(dataMap, out);
            out.close();
        } catch (TemplateException | IOException e) {
            LOGGER.info("Convert word error.", e);
            throw new IOException(e);
        } finally {
            if (out != null) try {
                out.close();
            } catch (IOException e) {
                LOGGER.info("Failed to close output stream.", e);
            }
        }
    }
}
