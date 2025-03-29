package com.wiseowls.StudentLink.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
