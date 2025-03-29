package com.wiseowls.StudentLink.Repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wiseowls.StudentLink.models.moreinfo;


public interface moreinfoRepository extends JpaRepository<moreinfo, Long> {
    boolean existsByAdmissionNo(String admissionNo);
    // Custom query if needed
    @Query("SELECT m FROM moreinfo m WHERE m.id = :id")
    Optional<moreinfo> getMoreinfobyId(@Param("id") Long id);
}
