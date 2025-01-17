package org.example.javaproject1.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions/{clientId}")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public Transaction addTransaction(@PathVariable Long clientId, @RequestBody Transaction transaction) {
        return transactionService.addTransaction(clientId, transaction);
    }

    @GetMapping
    public List<Transaction> getTransactionsByClientId(@PathVariable Long clientId) {
        return transactionService.getTransactionsByClientId(clientId);
    }

    @DeleteMapping("/delete/{transactionId}")
    public void deleteTransaction(@PathVariable Long clientId, @PathVariable Long transactionId) {
        transactionService.remTransactionById(clientId, transactionId);
    }

    @PutMapping("/update/{transactionId}")
    public Transaction updateTransaction(@PathVariable Long clientId,
                                         @PathVariable Long transactionId,
                                         @RequestBody UpdateTransactionRequest request) {
        return transactionService.updateTransaction(
                transactionId,
                request.getAmount(),
                request.getComment(),
                request.getDate(),
                request.getCategory());
    }

    @GetMapping("/monthlyData")
    public List<SummaryData> getMonthlySummary(@PathVariable Long clientId) {
        if (clientId == null) {
            throw new IllegalArgumentException("Client ID must not be null");
        }

        List<Transaction> transactions = transactionService.getTransactionsByClientId(clientId);

        if (transactions.isEmpty()) {
            return Collections.emptyList();
        }

        Map<String, Double> monthlyTotalMap = new HashMap<>();
        for (Transaction transaction : transactions) {
            LocalDate date = transaction.getDate();

            if (date == null) {
                continue;
            }

            String monthKey = date.getMonth().toString() + " " + date.getYear();

            // Aggregate the transaction amount by month
            monthlyTotalMap.put(monthKey, monthlyTotalMap.getOrDefault(monthKey, 0.0) + transaction.getAmount());
        }

        // Convert map to a list of SummaryData objects for response
        return monthlyTotalMap.entrySet().stream()
                .map(entry -> new SummaryData(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }




    static class UpdateTransactionRequest {
        private Integer amount;
        private String comment;
        private LocalDate date;
        private String category;

        public Integer getAmount() {
            return amount;
        }

        public void setAmount(Integer amount) {
            this.amount = amount;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }
    }
}
