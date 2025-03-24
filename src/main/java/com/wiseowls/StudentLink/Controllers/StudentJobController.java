package com.wiseowls.StudentLink.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wiseowls.StudentLink.Services.JobService;
import com.wiseowls.StudentLink.models.Job;

import java.util.List;

@RestController
@RequestMapping("/api/student/jobs")
public class StudentJobController {
    @Autowired
    private JobService jobService;

    // Get all jobs (for student view)
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Filter jobs
    @GetMapping("/jobs/filter")
    public List<Job> filterJobs(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String skillsRequired,
            @RequestParam(required = false) String duration,
            @RequestParam(required = false) Integer openingsAvailable
    ) {
        return jobService.filterJobs(company, location, skillsRequired, duration, openingsAvailable);
    }

    // Search jobs by keyword
    @GetMapping("/jobs/search")
    public List<Job> searchJobs(@RequestParam String keyword) {
        return jobService.searchJobs(keyword);
    }
}