package com.wiseowls.StudentLink.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.wiseowls.StudentLink.Repositories.StudentRepository;
import com.wiseowls.StudentLink.dtos.StudentRegistrationDTO;
import com.wiseowls.StudentLink.models.Student;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Student registerStudent(StudentRegistrationDTO registrationDTO) {
        Student student = new Student();
        student.setFirstname(registrationDTO.getFirstname());
        student.setLastname(registrationDTO.getLastname());
        student.setUsername(registrationDTO.getUsername());
        student.setEmail(registrationDTO.getEmail());
        student.setPassword(passwordEncoder.encode(registrationDTO.getPassword())); // Hash the password

        return studentRepository.save(student);
    }
    
    public boolean isStudentRegisteredByEmail(String email) {
        // Implement the logic to check if the student is already registered in the database by email
        return studentRepository.existsByEmail(email);
    }
    
    public boolean isStudentRegisteredByUsername(String username) {
        // Implement the logic to check if the student is already registered in the database by username
        return studentRepository.existsByUsername(username);
    }
    
    // Method to fetch all registered students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}