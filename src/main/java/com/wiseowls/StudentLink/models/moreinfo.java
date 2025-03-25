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

    private String admissionNo;
    private String programStudy;
    private String skillname;
    private String skillDescription;
    private String interest;
    private String interestDescription;
    private String socialLinks;

    public moreinfo() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getAdmissionNo() {
        return admissionNo;
    }

    public void setAdmissionNo(String admissionNo) {
        this.admissionNo = admissionNo;
    }

    public String getProgramStudy() {
        return programStudy;
    }

    public void setProgramStudy(String programStudy) {
        this.programStudy = programStudy;
    }
    public String getSkillname() {
        return skillname;
    }
    public void setSkillname(String skillname) {
        this.skillname = skillname;
    }
    public String getSkilldescription() {
        return skillDescription;
    }
    public void setSkilldescription(String skilldescription) {
        this.skillDescription = skilldescription;
    }
    public String getInterest() {
        return interest;
    }
    public void setInterest(String interest) {
        this.interest = interest;
    }
    public String getInterestdescription() {
        return interestDescription;
    }
    public void setInterestdescription(String interestdescription) {
        this.interestDescription = interestdescription;
    }
    public String getSocialLink() {
        return socialLinks;
    }
    public void setSocialLink(String socialLink) {
        this.socialLinks = socialLink;
    }
}
