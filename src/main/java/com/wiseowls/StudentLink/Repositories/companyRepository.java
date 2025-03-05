package com.wiseowls.StudentLink.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.wiseowls.StudentLink.models.company;

@Repository
public interface companyRepository extends JpaRepository<company, Long> {

    
}