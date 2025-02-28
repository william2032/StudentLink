package com.wiseowls.StudentLink.Repositories;

import com.wiseowls.StudentLink.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}