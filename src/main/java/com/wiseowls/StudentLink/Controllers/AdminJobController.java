package com.wiseowls.StudentLink.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wiseowls.StudentLink.Services.JobService;
import com.wiseowls.StudentLink.models.Job;
import com.wiseowls.StudentLink.models.JobApplication;
import com.wiseowls.StudentLink.Repositories.JobApplicationRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/api/admin/jobs")
public class AdminJobController {
    @Autowired
    private JobService jobService;
    @Autowired
    private JobApplicationRepository applicationRepository;

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
     @GetMapping("/submissions")
    public ResponseEntity<?> getAllSubmissions() {
        try {
            List<Map<String, Object>> submissions = applicationRepository.findAll().stream().map(app -> {
                Map<String, Object> submissionData = new HashMap<>();
                submissionData.put("applicationId", app.getId());
                submissionData.put("studentName", app.getStudentName());
                submissionData.put("studentEmail", app.getStudentEmail());
                submissionData.put("companyName", app.getJob() != null ? app.getJob().getCompany() : "N/A");
                submissionData.put("status", app.getStatus());
                submissionData.put("appliedAt", app.getAppliedAt());
                return submissionData;
            }).collect(Collectors.toList());
            return ResponseEntity.ok(submissions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch submissions: " + e.getMessage());
        }
    }

    // Update application status
    @PutMapping("/submissions/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id, @RequestParam String status, @RequestParam(required = false) String reviewNotes) {
        Optional<JobApplication> optionalApplication = applicationRepository.findById(id);
        if (optionalApplication.isPresent()) {
            JobApplication application = optionalApplication.get();
            if ("APPROVED".equalsIgnoreCase(status)) {
                application.approve(reviewNotes);
            } else if ("REJECTED".equalsIgnoreCase(status)) {
                application.reject(reviewNotes);
            } else {
                return ResponseEntity.badRequest().body("Invalid status value. Use 'APPROVED' or 'REJECTED'.");
            }
            applicationRepository.save(application);
            return ResponseEntity.ok("Application status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found.");
        }
    }
}