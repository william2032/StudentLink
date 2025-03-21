package com.wiseowls.StudentLink.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wiseowls.StudentLink.models.moreinfo;


public interface moreinfoRepository extends JpaRepository<moreinfo, Long> {
    moreinfo findByEmail(String email);
    boolean existsByRegno(String regno);
}
