package com.wiseowls.StudentLink.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.wiseowls.StudentLink.Repositories.StudentRepository;
import com.wiseowls.StudentLink.dtos.loginRequestDTO;
import com.wiseowls.StudentLink.dtos.loginResponseDTO;
import com.wiseowls.StudentLink.models.Student;

@Service
public class loginService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Validate user and return loginResponseDTO with additional details
    public loginResponseDTO validateUser(loginRequestDTO loginRequestDTO) {
        Student student = studentRepository.findByUsername(loginRequestDTO.getUsername());
        if (student != null && passwordEncoder.matches(loginRequestDTO.getPassword(), student.getPassword())) {
            // Return a response with the student's details
            return new loginResponseDTO(
                "Login successful",
                true,
                student.getId(),
                student.getUsername(),
                student.getEmail()
            );
        } else {
            // Return a response indicating invalid credentials
            return new loginResponseDTO(
                "Invalid username or password",
                false,
                null,
                null,
                null
            );
        }
    }

    // Validate user using username and password (alternative method)
    public Optional<Student> validateUser(String username, String password) {
        Student student = studentRepository.findByUsername(username);
        Optional<Student> studentOptional = Optional.ofNullable(student);
        if (studentOptional.isPresent()) {
            if (passwordEncoder.matches(password, student.getPassword())) {
                return Optional.of(student);
            }
        }
        return Optional.empty();
    }
}
