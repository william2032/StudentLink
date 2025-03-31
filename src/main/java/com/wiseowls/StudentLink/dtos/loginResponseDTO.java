package com.wiseowls.StudentLink.dtos;

public class loginResponseDTO {
    private String message;
    private boolean success;
    private Long id; // Add the student's ID
    private String username; // Add the student's username
    private String email; // Add the student's email

    // Constructor
    public loginResponseDTO(String message, boolean success, Long id, String username, String email) {
        this.message = message;
        this.success = success;
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // Getters and Setters
    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean getSuccess() {
        return this.success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
