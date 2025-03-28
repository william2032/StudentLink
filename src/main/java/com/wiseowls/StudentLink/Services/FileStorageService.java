package com.wiseowls.StudentLink.Services;

import com.wiseowls.StudentLink.config.FileStorageProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileStorageService {
    
    private final Path fileStorageLocation;
    
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        // Validate upload directory configuration
        String uploadDir = Objects.requireNonNull(
            fileStorageProperties.getUploadDir(),
            "Upload directory path must be configured in application.properties"
        );
        
        this.fileStorageLocation = Paths.get(uploadDir)
            .toAbsolutePath()
            .normalize();
        
        createUploadDirectory();
    }
    
    private void createUploadDirectory() {
        try {
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            
            // Verify write permissions
            Path testFile = fileStorageLocation.resolve("permission_test.tmp");
            try {
                Files.createFile(testFile);
                Files.delete(testFile);
            } catch (AccessDeniedException e) {
                throw new RuntimeException("No write permissions in upload directory", e);
            }
            
        } catch (Exception ex) {
            throw new RuntimeException("Could not initialize upload directory", ex);
        }
    }
    
    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Failed to store empty or null file");
        }
        
        String originalFileName = StringUtils.cleanPath(
            Objects.requireNonNull(file.getOriginalFilename(), "Filename cannot be null")
        );
        validateFileName(originalFileName);
        
        String uniqueFileName = generateUniqueFilename(originalFileName);
        Path targetLocation = fileStorageLocation.resolve(uniqueFileName);
        
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return uniqueFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file " + originalFileName, ex);
        }
    }
    
    public Resource loadFileAsResource(String filename) {
        try {
            Path filePath = getFilePath(filename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found or not readable: " + filename);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to load file: " + filename, ex);
        }
    }
    
    private void validateFileName(String fileName) {
        if (fileName.contains("..")) {
            throw new RuntimeException("Filename contains invalid path sequence: " + fileName);
        }
        if (fileName.length() > 255) {
            throw new RuntimeException("Filename too long");
        }
    }
    
    private String generateUniqueFilename(String originalFileName) {
        String fileExtension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFileName.substring(dotIndex);
        }
        return UUID.randomUUID().toString() + fileExtension;
    }
    
    public Path getFilePath(String filename) {
        Path filePath = fileStorageLocation.resolve(Objects.requireNonNull(filename)).normalize();
        
        // Security check to prevent directory traversal
        if (!filePath.startsWith(fileStorageLocation)) {
            throw new RuntimeException("Attempt to access file outside permitted directory");
        }
        
        return filePath;
    }
}