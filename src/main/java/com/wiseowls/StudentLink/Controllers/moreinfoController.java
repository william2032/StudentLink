package com.wiseowls.StudentLink.Controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiseowls.StudentLink.Repositories.StudentRepository;
import com.wiseowls.StudentLink.Repositories.moreinfoRepository;
import com.wiseowls.StudentLink.models.Student;
import com.wiseowls.StudentLink.models.moreinfo;


@RestController
@RequestMapping("/api/moreinfo")
public class moreinfoController {

    @Autowired
    private moreinfoRepository moreInfoRepository;
    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/add/{studentId}") // Endpoint to add moreinfo for a student
    public ResponseEntity<?> addMoreInfo(@PathVariable Long studentId, @RequestBody moreinfo moreInfo) {
        try {
            // Fetch the Student entity using the studentId
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            // Associate the Student with the moreinfo entity
            moreInfo.setStudent(student);

            // Save the moreinfo entity to the database
            moreinfo savedInfo = moreInfoRepository.save(moreInfo);

            // Return the saved moreinfo entity as a JSON response
            return ResponseEntity.ok(savedInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error saving data\"}"); // Return JSON error
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getMoreinfobyId(@PathVariable Long id) {
        try {
            // Fetch the moreinfo object by ID
            Optional<moreinfo> moreInfo = moreInfoRepository.findById(id);
    
            // Check if the object exists
            if (moreInfo.isPresent()) {
                return ResponseEntity.ok(moreInfo.get()); // Return the object as JSON
            } else {
                return ResponseEntity.status(404).body("{\"error\": \"Moreinfo not found\"}"); // Return 404 if not found
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error fetching data\"}"); // Return 500 on error
        }
    }
    
}
