package com.wiseowls.StudentLink.dtos;

import lombok.Data;

@Data
public class StudentRegistrationDTO {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;
}