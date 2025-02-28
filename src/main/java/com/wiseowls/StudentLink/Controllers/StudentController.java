package com.wiseowls.StudentLink.Controllers;

import com.wiseowls.StudentLink.dtos.StudentRegistrationDTO;
import com.wiseowls.StudentLink.models.Student;
import com.wiseowls.StudentLink.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    // Endpoint to register a student
    @PostMapping("/register")
    public String registerStudent(@RequestBody StudentRegistrationDTO registrationDTO) {
        studentService.registerStudent(registrationDTO);
        return "Student registered successfully!";
    }

    // Endpoint to fetch all registered students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}