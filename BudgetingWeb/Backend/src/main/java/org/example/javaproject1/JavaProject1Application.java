package org.example.javaproject1;

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


}
