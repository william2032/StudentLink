package com.wiseowls.StudentLink.dtos;

public class loginResponseDTO {
    private  String message;
    private  boolean success;


    public loginResponseDTO(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() {
        return this.message;
    }

    public boolean getSuccess() {
        return this.success;
    }

}
