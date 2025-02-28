package com.wiseowls.StudentLink.Services;

import com.wiseowls.StudentLink.dtos.StudentRegistrationDTO;
import com.wiseowls.StudentLink.models.Student;
import com.wiseowls.StudentLink.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

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

    // Method to fetch all registered students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}