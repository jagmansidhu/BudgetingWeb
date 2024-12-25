package org.example.javaproject1.client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository
        extends JpaRepository<Client, Long> {

    // SELECT * FROM client WHERE email =?
    //@Query("SELECT c from Client c WHERE c.email=?1") //JBQL
    Optional<Client> findClientByEmail(String email);

    Optional<Client> findByEmail(String email);
}
