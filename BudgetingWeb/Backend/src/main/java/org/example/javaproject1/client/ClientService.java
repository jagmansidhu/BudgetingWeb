package org.example.javaproject1.client;

import jakarta.transaction.Transactional;
import org.example.javaproject1.transaction.Transaction;
import org.example.javaproject1.transaction.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository, TransactionRepository transactionRepository) {
        this.clientRepository = clientRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public Client getClient(Long clientId) {
        return clientRepository.findById(clientId)
                .orElseThrow(()
                        -> new IllegalStateException("Client with id " + clientId + " does not exist"));
    }


    public void addNewClient(Client client) {
        Optional<Client> clientOptional = clientRepository.findClientByEmail(client.getEmail());
        if (clientOptional.isPresent()) {
            throw new IllegalArgumentException("Client with email " + client.getEmail() + " already exists");
        }
        clientRepository.save(client);
    }

    public void deleteClient(Long clientId) {
        boolean exists = clientRepository.existsById(clientId);
        if (!exists) {
            throw new IllegalArgumentException("Client with id " + clientId + " does not exist");
        }
        clientRepository.deleteById(clientId);
    }

    @Transactional
    public void updateClient(Long clientId, String name, String email) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + clientId + " does not exist"));

        if (name != null && !name.isEmpty() && !Objects.equals(client.getName(), name)) {
            client.setName(name);
        }

        if (email != null && !email.isEmpty() && !Objects.equals(client.getEmail(), email)) {
            Optional<Client> clientOptional = clientRepository.findClientByEmail(email);
            if (clientOptional.isPresent()) {
                throw new IllegalArgumentException("Client with email " + email + " already exists");
            }
            client.setEmail(email);
        }
    }

    public Client registerClient(String name, String email, String password) {
        if (emailExists(email)) {
            throw new IllegalStateException("Email " + email + " is already registered.");
        }
        Client client = new Client(name, email, password);
        return clientRepository.save(client);
    }

    public boolean emailExists(String email) {
        return clientRepository.findByEmail(email).isPresent();
    }

    public Client loginClient(String email) {
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account does not exist"));
        return client;
    }
    public boolean checkPassword(Client client, String password) {
        return client.getPassword().equals(password);
    }

    public Client getClientByEmail(String email) {
        return clientRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Client with email " + email + " does not exist"));
    }
}

