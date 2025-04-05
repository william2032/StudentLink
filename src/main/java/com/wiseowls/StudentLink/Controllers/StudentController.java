package com.wiseowls.StudentLink.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<Map<String, Object>> registerStudent(@RequestBody StudentRegistrationDTO registrationDTO) {
        try {
            // Check if the student is already registered by email or username
            boolean isRegisteredByEmail = studentService.isStudentRegisteredByEmail(registrationDTO.getEmail());
            boolean isRegisteredByUsername = studentService.isStudentRegisteredByUsername(registrationDTO.getUsername());

            if (isRegisteredByEmail || isRegisteredByUsername) {
                // If the student is already registered, return a conflict response
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Student is already registered.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
            }

            // Register the student if they are not already registered
            Student savedStudent = studentService.registerStudent(registrationDTO);

            // Create a success response including the student's ID
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("id", savedStudent.getId());
            successResponse.put("message", "Student registered successfully.");

            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to register student: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
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

    // Endpoint to fetch a student by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        try {
            // Fetch the student by ID
            Optional<Student> student = studentService.findById(id);

            if (student.isPresent()) {
                return ResponseEntity.ok(student.get()); // Return the student as JSON
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"Student not found.\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Failed to fetch student: " + e.getMessage() + "\"}");
        }
    }
}

