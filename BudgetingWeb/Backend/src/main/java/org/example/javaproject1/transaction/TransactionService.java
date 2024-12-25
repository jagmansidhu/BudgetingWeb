package org.example.javaproject1.transaction;

import org.example.javaproject1.client.Client;
import org.example.javaproject1.client.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, ClientRepository clientRepository) {
        this.transactionRepository = transactionRepository;
        this.clientRepository = clientRepository;
    }

    @Transactional
    public Transaction addTransaction(Long clientId, Transaction transaction) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException("Client with id " + clientId + " does not exist"));

        transaction.setClient(client);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByClientId(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException("Client with id " + clientId + " does not exist"));

        return client.getTransactions();
    }

    public void remTransactionById(Long clientId, Long transactionId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException("Client with id " + clientId + " does not exist"));

        transactionRepository.deleteById(transactionId);
    }

    @Transactional
    public Transaction updateTransaction(Long transactionId, Integer amount, String comment, LocalDate date, String category) {

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() ->
                        new IllegalStateException("Transaction with id " + transactionId + " does not exist"));
        transaction.setAmount(amount);
        transaction.setComment(comment);
        transaction.setDate(date);
        transaction.setCategory(category);
        return transactionRepository.save(transaction);
    }
}
