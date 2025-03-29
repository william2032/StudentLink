package com.wiseowls.StudentLink.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Integer jobId;
    
    @Column(nullable = false, length = 100)
    private String studentName;
    
    @Column(nullable = false, length = 100)
    private String studentEmail;
    
    @Column(nullable = false)
    private String resumePath;  // Stores the physical filename
    
    @Column(nullable = false)
    private String resumeUrl;   // Stores the downloadable URL
    
    @Column(columnDefinition = "TEXT")
    private String coverLetter;
    
    @Column(nullable = false, length = 20)
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    
    @Column(name = "applied_at", nullable = false, updatable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();
    
    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
    
    @Column(length = 500)
    private String reviewNotes;

    // Constructors
    public JobApplication() {
    }

    public JobApplication(Integer jobId, String studentName, String studentEmail) {
        this.jobId = jobId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        if ("APPROVED".equals(status) || "REJECTED".equals(status)) {
            this.reviewedAt = LocalDateTime.now();
        }
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public String getReviewNotes() {
        return reviewNotes;
    }

    public void setReviewNotes(String reviewNotes) {
        this.reviewNotes = reviewNotes;
    }

    // Business logic methods
    public boolean isPending() {
        return "PENDING".equals(status);
    }

    public boolean isApproved() {
        return "APPROVED".equals(status);
    }

    public boolean isRejected() {
        return "REJECTED".equals(status);
    }

    @Override
    public String toString() {
        return "JobApplication{" +
                "id=" + id +
                ", jobId=" + jobId +
                ", studentName='" + studentName + '\'' +
                ", studentEmail='" + studentEmail + '\'' +
                ", status='" + status + '\'' +
                ", appliedAt=" + appliedAt +
                ", reviewedAt=" + reviewedAt +
                '}';
    }

    // Helper method for status transitions
    public void approve(String notes) {
        this.status = "APPROVED";
        this.reviewedAt = LocalDateTime.now();
        this.reviewNotes = notes;
    }

    public void reject(String notes) {
        this.status = "REJECTED";
        this.reviewedAt = LocalDateTime.now();
        this.reviewNotes = notes;
    }
}