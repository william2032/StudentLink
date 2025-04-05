package com.wiseowls.StudentLink.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wiseowls.StudentLink.Repositories.StudentRepository;
import com.wiseowls.StudentLink.Repositories.moreinfoRepository;
import com.wiseowls.StudentLink.models.Student;
import com.wiseowls.StudentLink.models.moreinfo;

@Service
public class moreinfoService {
    @Autowired
    private moreinfoRepository moreinfoRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Updated method to associate moreinfo with Student and save it
    public moreinfo saveMoreinfo(Long studentId, moreinfo moreinfo) {
        // Fetch the Student entity by ID
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Associate the Student with the moreinfo entity
        moreinfo.setStudent(student);

        // Save the moreinfo entity to the repository
        return moreinfoRepository.save(moreinfo);
    }
}
