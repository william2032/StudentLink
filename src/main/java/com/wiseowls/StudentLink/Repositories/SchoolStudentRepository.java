package com.wiseowls.StudentLink.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wiseowls.StudentLink.models.SchoolStudents;

public interface SchoolStudentRepository extends JpaRepository<SchoolStudents, Long> {
    boolean existsByAdmissionNo(String admissionNo);
    
    // Custom query if needed
    @Query("SELECT s FROM SchoolStudents s WHERE s.id = :id")
    Optional<SchoolStudents> getSchoolStudentById(@Param("id") Long id);

    Optional<SchoolStudents> findByAdmissionNo(String admissionNo);

    
}

