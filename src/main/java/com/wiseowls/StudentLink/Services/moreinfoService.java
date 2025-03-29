package com.wiseowls.StudentLink.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wiseowls.StudentLink.Repositories.moreinfoRepository;
import com.wiseowls.StudentLink.models.moreinfo;

@Service
public class moreinfoService {
    @Autowired
    private moreinfoRepository moreinfoRepository;

    public moreinfo saveMoreinfo(moreinfo moreinfo) {
        return moreinfoRepository.save(moreinfo);
    }
}
