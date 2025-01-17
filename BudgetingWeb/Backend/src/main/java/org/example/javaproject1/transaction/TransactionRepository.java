package org.example.javaproject1.transaction;

import org.example.javaproject1.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT MAX(t.id) FROM Transaction t WHERE t.client.id = :clientId")
    Optional<Long> findMaxIdByClientId(Long clientId);

    Optional<Transaction> findByIdAndClient(Long id, Client client);




}
