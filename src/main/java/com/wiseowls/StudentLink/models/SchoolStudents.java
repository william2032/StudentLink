package com.wiseowls.StudentLink.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "school_students")
public class SchoolStudents {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String studentName;

        @Column(nullable = false)
        private String admissionNo;

        @Column(nullable = false)
        private String courseName;

        @Column(nullable = false)
        private int year;

        public SchoolStudents() {
        }

        // Getters and Setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getStudentName() {
            return studentName;
        }
        
        public void setStudentName(String studentName) {
            this.studentName = studentName;
        }
        
        public String getAdmissionNo() {
            return admissionNo;
        }
        
        public void setAdmissionNo(String admissionNo) {
            this.admissionNo = admissionNo;
        }
        
        public String getcourseName() {
            return courseName;
        }
        
        public void setcourseName(String courseName) {
            this.courseName = courseName;
        }
        public int getYear() {
            return year;
        }
        public void setYear(int year) {
            this.year = year;
        }


    }

