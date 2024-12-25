package org.example.javaproject1.client;

import jakarta.persistence.*;
import org.example.javaproject1.transaction.Transaction;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "client")
public class Client {
    @Id
    @SequenceGenerator(
            name = "client_sequence",
            sequenceName = "client_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "client_sequence"
    )
    private Long id;
    private String name;
    private String email;

    // PASSWORD FOR FUTURE USE
    private String password;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions;

    public Client() {
    }

    public Client(Long id, String name, String email, String password) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

  /*  public Client(String name, String email) {
        this.name = name;
        this.email = email;
    */

    public Client(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", transactions=" + transactions +
                '}';
    }
}


