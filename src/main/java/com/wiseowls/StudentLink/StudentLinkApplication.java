package com.wiseowls.StudentLink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.wiseowls.StudentLink.config.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class StudentLinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentLinkApplication.class, args);
	}

}
