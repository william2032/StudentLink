package com.wiseowls.StudentLink.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiseowls.StudentLink.Services.moreinfoService;
import com.wiseowls.StudentLink.models.moreinfo;

@RestController
@RequestMapping("/api/moreinfo")
public class moreinfoController {

    @Autowired
    private moreinfoService moreinfoService;

    @PostMapping("/add")

    public String registerMoreinfo(@RequestBody moreinfo moreinfo) {
        moreinfoService.saveMoreinfo(moreinfo);
        return "Moreinfo registered successfully";
    }
}
