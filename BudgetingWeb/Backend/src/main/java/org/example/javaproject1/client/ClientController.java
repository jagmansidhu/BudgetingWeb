package org.example.javaproject1.client;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;
    private final ClientRepository clientRepository;

    @Autowired
    public ClientController(ClientService clientService, ClientRepository clientRepository) {
        this.clientService = clientService;
        this.clientRepository = clientRepository;
    }

    //Using to see if react connected with backend
    @GetMapping("/ping")
    public String ping() {
        return "Backend is running!";
    }

    //Gets all Clients
    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

    //Get data for certain client by Id
    @GetMapping(path = "/get/{clientId}")
    public Client getClient(@PathVariable("clientId") Long clientId) {
        return clientService.getClient(clientId);
    }

    // Adds new client to db
    @PostMapping
    public void registerClient(@RequestBody Client client) {
        clientService.addNewClient(client);
    }

    //Deletes Client from db
    @DeleteMapping(path = "{clientId}")
    public void deleteClient(@PathVariable("clientId") Long clientId) {
        clientService.deleteClient(clientId);
    }

//    @PutMapping(path="{clientId}")
//    public void updateClient(@PathVariable("clientId") Long clientId, @RequestBody Client client) {
//
//
//    }

    @PutMapping(path = "/update/email/{clientId}")
    public ResponseEntity<Client> updateEmail(@PathVariable("clientId") Long clientId,
                                              @RequestBody Map<String, String> updates) {


        String email = updates.get("email");

        clientService.updateEmail(clientId, email);
        Client updatedClient = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        return ResponseEntity.ok(updatedClient);

    }

    @PutMapping(path = "/update/password/{clientId}")
    public ResponseEntity<Client> updatePassword(@PathVariable("clientId") Long clientId,
                                                 @RequestBody Map<String, String> updates) {

        String password = updates.get("password");

        clientService.updatePassword(clientId, password);
        Client updatedClient = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client not found"));

        return ResponseEntity.ok(updatedClient);

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@Valid @RequestBody RegisterClientRequest request, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            Client client = clientService.registerClient(request.getName(), request.getEmail(), request.getPassword());
            return ResponseEntity.ok(client);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("/login")
    public Client loginClient(@RequestBody LoginRequest request) {
        System.out.println("Received login request for email: " + request.getEmail());
        Client client = clientService.loginClient(request.getEmail());

        if (!clientService.checkPassword(client, request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password is incorrect");
        }
        return client;
    }

    @GetMapping("/getByEmail")
    public Client getClientByEmail(@RequestParam String email) {
        return clientService.getClientByEmail(email);
    }
}










