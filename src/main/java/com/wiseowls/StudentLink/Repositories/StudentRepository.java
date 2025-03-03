package com.wiseowls.StudentLink.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wiseowls.StudentLink.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUsername(String username);
}