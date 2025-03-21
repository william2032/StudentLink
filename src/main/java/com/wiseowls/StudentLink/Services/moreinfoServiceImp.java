package com.wiseowls.StudentLink.Services;

import com.wiseowls.StudentLink.Repositories.moreinfoRepository;
import com.wiseowls.StudentLink.models.moreinfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class moreinfoServiceImp implements moreinfoService {
    @Autowired
    private moreinfoRepository moreinfoRepository;

    @Override
    public moreinfo saveMoreinfo(moreinfo moreinfo) {
        return moreinfoRepository.save(moreinfo);
    }

}
