package com.wiseowls.StudentLink.Services;


import com.wiseowls.StudentLink.Repositories.companyRepository;
import com.wiseowls.StudentLink.models.company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class companyServiceimp implements companyService {


    @Autowired
    private companyRepository companyRepository;


    @Override
    public company saveCompany(company company) {
        return companyRepository.save(company);
    }

}
