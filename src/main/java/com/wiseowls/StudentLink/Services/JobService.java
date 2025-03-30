package com.wiseowls.StudentLink.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wiseowls.StudentLink.Repositories.JobRepository;
import com.wiseowls.StudentLink.models.Job;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    // Add a new job
    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get a job by ID
    public Optional<Job> getJobById(Integer id) {
        return jobRepository.findById(id);
    }

    // Update a job
    public Job updateJob(Integer id, Job updatedJob) {
        return jobRepository.findById(id)
                .map(job -> {
                    job.setCompany(updatedJob.getCompany());
                    job.setLocation(updatedJob.getLocation());
                    job.setSkillsRequired(updatedJob.getSkillsRequired());
                    job.setDuration(updatedJob.getDuration());
                    job.setOpeningsAvailable(updatedJob.getOpeningsAvailable());
                    job.setJobDescription(updatedJob.getJobDescription());
                    return jobRepository.save(job);
                })
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    // Delete a job
     public void deleteJob(Integer id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        jobRepository.deleteById( id);
    }



    // Filter jobs
    public List<Job> filterJobs(String company, String location, String skillsRequired, String duration, Integer openingsAvailable) {
        return jobRepository.findFilteredJobs(company, location, skillsRequired, duration, openingsAvailable);
    }

}