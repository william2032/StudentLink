package com.wiseowls.StudentLink.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wiseowls.StudentLink.models.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {
    // Custom query to delete a job by ID
    void deleteById(@SuppressWarnings("null") Integer id);
}