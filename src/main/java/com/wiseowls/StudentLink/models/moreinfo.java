package com.wiseowls.StudentLink.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "profileinfo")
public class moreinfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;  
    private String course;
    private String regno;
    private String skillname;
    private String skilldescription;
    private String interest;
    private String interestdescription;

    public moreinfo() {
    }

    public moreinfo(String email, String course, String regno, String skillname, String skilldescription, String interest, String interestdescription) {
        this.email = email;
        this.course = course;
        this.regno = regno;
        this.skillname = skillname;
        this.skilldescription = skilldescription;
        this.interest = interest;
        this.interestdescription = interestdescription;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getCourse() {
        return course;
    }
    public void setCourse(String course) {
        this.course = course;
    }
    public String getRegno() {
        return regno;
    }
    public void setRegno(String regno) {
        this.regno = regno;
    }
    
    public String getSkillname() {
        return skillname;
    }
    public void setSkillname(String skillname) {
        this.skillname = skillname;
    }
    public String getSkilldescription() {
        return skilldescription;
    }
    public void setSkilldescription(String skilldescription) {
        this.skilldescription = skilldescription;
    }
    public String getInterest() {
        return interest;
    }
    public void setInterest(String interest) {
        this.interest = interest;
    }
    public String getInterestdescription() {
        return interestdescription;
    }
    public void setInterestdescription(String interestdescription) {
        this.interestdescription = interestdescription;
    }
}
