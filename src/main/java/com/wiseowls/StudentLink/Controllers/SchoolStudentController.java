package com.wiseowls.StudentLink.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wiseowls.StudentLink.Services.SchoolStudentService;
import com.wiseowls.StudentLink.models.SchoolStudents;



@RestController
@RequestMapping("/api/studentschool")
public class SchoolStudentController {

    @Autowired
    private SchoolStudentService studentSchoolService;


    @PostMapping("/add")
    public String add(@RequestBody SchoolStudents Schoolstudent) {
        studentSchoolService.saveSchoolStudent(Schoolstudent);
        return "Student added successfully";
    }
    @GetMapping("/{admissionNo}")
    public SchoolStudents getStudentByAdmissionNo(@PathVariable String admissionNo) {
        return studentSchoolService.getStudentByAdmissionNo(admissionNo);
    }
    
}
