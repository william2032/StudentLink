package com.wiseowls.StudentLink.Controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiseowls.StudentLink.Services.loginService;
import com.wiseowls.StudentLink.dtos.loginResponseDTO;
import com.wiseowls.StudentLink.models.Student;

@RestController
@RequestMapping("/api/login")
public class logincontroller {
    @Autowired
    private loginService loginService;

@PostMapping("/login")
public ResponseEntity<loginResponseDTO> loginStudent(@RequestBody Map<String, String> loginDetails) {
    try {
        String username = loginDetails.get("username");
        String password = loginDetails.get("password");

        // Authenticate the student
        Optional<Student> studentOptional = loginService.validateUser(username, password);

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();

            // Return a success response with the student's details
            loginResponseDTO response = new loginResponseDTO(
                "Login successful.",
                true,
                student.getId(),
                student.getUsername(),
                student.getEmail()
            );

            return ResponseEntity.ok(response);
        } else {
            // Return an error response if authentication fails
            loginResponseDTO response = new loginResponseDTO(
                "Invalid username or password.",
                false,
                null,
                null,
                null
            );

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    } catch (Exception e) {
        loginResponseDTO response = new loginResponseDTO(
            "Failed to log in: " + e.getMessage(),
            false,
            null,
            null,
            null
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
}