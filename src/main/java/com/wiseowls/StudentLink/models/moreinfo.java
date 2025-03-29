package com.wiseowls.StudentLink.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "profileinfo",
        uniqueConstraints = @UniqueConstraint( columnNames = {"admissionNo"})
)
public class moreinfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String admissionNo;

    @Column(nullable = false)
    private String programStudy;

    @Column(nullable = false)
    private String skillname;
    
    @Column(nullable = false)
    private String skillDescription;
    
    @Column(nullable = false)
    private String interest;
    
    @Column(nullable = false)
    private String interestDescription;

    @Column(nullable = false)
    private String socialLinks;
    
    @OneToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id" )
    private Student student;
    
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
