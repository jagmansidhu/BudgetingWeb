package org.example.javaproject1;

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
            S3Service s3Service
    ) {
        return args -> {
            s3Service.putObject("bucketweb-test",
            "foo",
                    "Hello WOrld".getBytes()
            );

            byte[] obj = s3Service.getObject("bucketweb-test",
                    "foo");
            System.out.println("it worked??" +new String(obj));

        };
    }


}
