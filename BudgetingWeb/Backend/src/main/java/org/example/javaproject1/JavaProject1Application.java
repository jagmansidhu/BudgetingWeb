package org.example.javaproject1;

import org.example.javaproject1.s3.S3Buckets;
import org.example.javaproject1.s3.S3Service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication

public class JavaProject1Application {

    public static void main(String[] args) {
        SpringApplication.run(JavaProject1Application.class, args);
    }

    @Bean
    CommandLineRunner runner(
    ) {
        return args -> {
//            bucketUploadTest(s3Service, s3Buckets);

        };
    }

    private static void bucketUploadTest(S3Service s3Service, S3Buckets s3Buckets) {
        s3Service.putObject(
                s3Buckets.getClient(),
                "foo",
                "Hello WOrld".getBytes()
        );

        byte[] obj = s3Service.getObject(
                s3Buckets.getClient(),
                "foo");
        System.out.println("it worked??" +new String(obj));
    }


}
