/*
package org.example.javaproject1.client;

import org.example.javaproject1.transaction.Transaction;
import org.example.javaproject1.transaction.TransactionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;

import static java.time.Month.DECEMBER;

@Configuration
public class ClientConfig {
    @Bean
    CommandLineRunner commandLineRunner(ClientRepository clientRepository, TransactionRepository transactionRepository) {
        return args -> {
            Client john = new Client("John", "john@gmail.com", "123");
            clientRepository.save(john);

            Transaction t1 = new Transaction(22, "Comment for beans", LocalDate.of(2024, DECEMBER, 12), "", john);
            Transaction t2 = new Transaction(30, "Comment for apples", LocalDate.of(2024, DECEMBER, 15), "", john);
            transactionRepository.saveAll(Arrays.asList(t1, t2));

            Client jusef = new Client("jusef", "jusef@gmail.com", "123");
            clientRepository.save(jusef);

            Transaction t4 = new Transaction(22, "Comment for beans", LocalDate.of(2024, DECEMBER, 12),"", jusef);
            Transaction t3 = new Transaction(30, "Comment for apples", LocalDate.of(2024, DECEMBER, 15), "diner", jusef);
            transactionRepository.saveAll(Arrays.asList(t4, t3));
        };
    }
}
*/
