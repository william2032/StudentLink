package com.wiseowls.StudentLink.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wiseowls.StudentLink.Repositories.SchoolStudentRepository;
import com.wiseowls.StudentLink.models.SchoolStudents;


@Service
public class SchoolStudentService {
    @Autowired
    private SchoolStudentRepository schoolStudentRepository;

    public SchoolStudents saveSchoolStudent(SchoolStudents schoolStudent) {
        return schoolStudentRepository.save(schoolStudent);
    }

    public SchoolStudents getStudentByAdmissionNo(String admissionNo) {
        return schoolStudentRepository.findByAdmissionNo(admissionNo)
                .orElseThrow(() -> new IllegalArgumentException("Student with admission number " + admissionNo + " not found"));
    }
}

