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

import com.wiseowls.StudentLink.Repositories.moreinfoRepository;
import com.wiseowls.StudentLink.models.moreinfo;


@RestController
@RequestMapping("/api/moreinfo")
public class moreinfoController {

    @Autowired
    private moreinfoRepository moreInfoRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addMoreInfo(@RequestBody moreinfo moreInfo) {
        try {
            // Save the data to the database
            moreinfo savedInfo = moreInfoRepository.save(moreInfo);
            return ResponseEntity.ok(savedInfo); // Return JSON response
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error  saving data\"}"); // Return JSON error
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
