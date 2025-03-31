package com.wiseowls.StudentLink.Controllers;

import com.wiseowls.StudentLink.models.JobApplication;
import com.wiseowls.StudentLink.Repositories.JobApplicationRepository;
import com.wiseowls.StudentLink.Services.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Collections;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    
    private final JobApplicationRepository applicationRepository;
    private final FileStorageService fileStorageService;

    public ApplicationController(JobApplicationRepository applicationRepository,
                                FileStorageService fileStorageService) {
        this.applicationRepository = applicationRepository;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submitApplication(
        @RequestPart("jobId") String jobId,
        @RequestPart("name") String name,
        @RequestPart("email") String email,
        @RequestPart("resume") MultipartFile resume,
        @RequestPart(value = "coverLetter", required = false) String coverLetter) {
        
        try {
            // Validate inputs
            if (resume.isEmpty()) {
                return ResponseEntity.badRequest().body("Resume file is required");
            }

            // Store file and get filename
            String storedFilename = fileStorageService.storeFile(resume);
            
            // Generate download URL using the controller endpoint
            String downloadUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/applications/download/")
                .path(storedFilename)
                .toUriString();

            // Create and save application
            JobApplication application = new JobApplication();
            application.setJobId(Integer.parseInt(jobId));
            application.setStudentName(name);
            application.setStudentEmail(email);
            application.setResumePath(storedFilename);
            application.setResumeUrl(downloadUrl);  // Changed from resumeUri to resumeUrl
            application.setCoverLetter(coverLetter);
            application.setStatus("PENDING");
            
            JobApplication savedApplication = applicationRepository.save(application);
            // Fetch the saved application details
            Optional<JobApplication> fetchedApplication = applicationRepository.findById(savedApplication.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(fetchedApplication.orElse(savedApplication));
                
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid job ID format");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body("Failed to submit application: " + e.getMessage());
        }
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Resource resource = fileStorageService.loadFileAsResource(filename);
            
            String contentType = "application/octet-stream";
            String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
            
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(null);
        }
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicationsForJob(@PathVariable Integer jobId) {
        try {
            List<JobApplication> applications = applicationRepository.findByJobId(jobId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body("Failed to retrieve applications: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable Long id) {
        Optional<JobApplication> application = applicationRepository.findById(id);
        return application.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/status")
    public ResponseEntity<?> getApplicationStatus() {
        try {
            List<JobApplication> applications = applicationRepository.findAll();
            List<JobApplication> reversedApplications = new ArrayList<>(applications);
            
            Collections.reverse(reversedApplications);
            List<Map<String, Object>> response = reversedApplications.stream()
                .map(app -> {
                    Map<String, Object> appStatus = new HashMap<>();
                    appStatus.put("jobId", app.getJobId());
                    appStatus.put("status", app.getStatus());
                    appStatus.put("timestamp", app.getAppliedAt());
                    appStatus.put("companyName", app.getJob() != null ? app.getJob().getCompany() : "N/A");
                    return appStatus;
                })
                .collect(Collectors.toList());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body("Failed to retrieve application statuses: " + e.getMessage());
        }
    }

}