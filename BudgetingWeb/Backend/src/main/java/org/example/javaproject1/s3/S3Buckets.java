package org.example.javaproject1.s3;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aws.s3.buckets")
public class S3Buckets {

    private String client;

    public String getClient() {
        return client;
    }
    public void setClient(String client) {
        this.client = client;
    }
}
