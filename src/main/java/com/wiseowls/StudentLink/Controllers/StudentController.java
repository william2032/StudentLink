package com.wiseowls.StudentLink.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiseowls.StudentLink.Services.StudentService;
import com.wiseowls.StudentLink.dtos.StudentRegistrationDTO;
import com.wiseowls.StudentLink.models.Student;

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
