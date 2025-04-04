package com.wiseowls.StudentLink.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wiseowls.StudentLink.Services.JobService;
import com.wiseowls.StudentLink.models.Job;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/jobs")
public class AdminJobController {
    @Autowired
    private JobService jobService;

    // Add a new job
    @PostMapping
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
      try {
        job.setActive(true);  
        Job savedJob = jobService.addJob(job);
        return ResponseEntity.ok(savedJob);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    }

    // Get all jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get a job by ID
    @GetMapping("/{id}")
    public Optional<Job> getJobById(@PathVariable Integer id) {
        return jobService.getJobById(id);
    }

    // Update a job
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Integer id, @RequestBody Job updatedJob) {
        return jobService.updateJob(id, updatedJob);
    }

    // Delete a job
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Integer id) {
        try {
            jobService.deleteJob(id);
            return ResponseEntity.ok().body("Job deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}