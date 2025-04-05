package com.wiseowls.StudentLink.Repositories;
import com.wiseowls.StudentLink.models.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByJob_Id(Integer jobId);
}