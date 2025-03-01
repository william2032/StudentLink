package com.wiseowls.StudentLink.Services;

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
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public loginResponseDTO validateUser(loginRequestDTO loginRequestDTO) {
        Student student = studentRepository.findByUsername(loginRequestDTO.getUsername());
        if (student != null && passwordEncoder.matches(loginRequestDTO.getPassword(), student.getPassword())) {
            return new loginResponseDTO("Login successful", true);
        } else {
            return new loginResponseDTO("Invalid username or password", false);
        }
    }

}
