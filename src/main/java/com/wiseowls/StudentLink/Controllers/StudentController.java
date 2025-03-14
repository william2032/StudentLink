package com.wiseowls.StudentLink.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiseowls.StudentLink.Services.StudentService;
import com.wiseowls.StudentLink.dtos.StudentRegistrationDTO;
import com.wiseowls.StudentLink.models.Student;

@RestController



@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    // Endpoint to register a student
    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(@RequestBody StudentRegistrationDTO registrationDTO) {
        try {
            // Check if the student is already registered by email or username
            boolean isRegisteredByEmail = studentService.isStudentRegisteredByEmail(registrationDTO.getEmail());
            boolean isRegisteredByUsername = studentService.isStudentRegisteredByUsername(registrationDTO.getUsername());
            
            if (isRegisteredByEmail || isRegisteredByUsername) {
                // If the student is already registered, return a conflict response
                return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"error\": \"Student is already registered.\"}");
            }
            
            // Register the student if they are not already registered
            studentService.registerStudent(registrationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("{}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Failed to register student: " + e.getMessage() + "\"}");
        }
    }
    

    // Endpoint to fetch all registered students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            List<Student> students = studentService.getAllStudents();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}