package ibf.nus.iss.day38_backend.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import ibf.nus.iss.day38_backend.models.ImageData;
import ibf.nus.iss.day38_backend.repositories.ImageRepo;
import ibf.nus.iss.day38_backend.repositories.S3Repo;

@Service
public class ImageService {
    
    @Autowired
    private ImageRepo imageRepo;

    @Autowired
    private S3Repo s3Repo;

    public String saveToS3(MultipartFile file) {
        return s3Repo.saveToS3(file);
    }

    public byte[] getFileFromS3(String fileId) {
        return s3Repo.getFileFromS3(fileId);
    }

    public String saveToDB(InputStream is, String contentType) {
        String pic_id = UUID.randomUUID().toString().substring(0, 8);
        imageRepo.save(pic_id, is, contentType);
        return pic_id;
    }

    public Optional<ImageData> getPicture (String pic_id) {
        return imageRepo.getPicture(pic_id);
    }


    ////////////////////////////////////// ADDITIONAL ////////////////////////////////////////
    //////////////// Additional: upload files and save to local directory ////////////////////
    public final Path fileUpload = Paths.get("uploads");

    public void initDirectory() {
        try {
            Files.createDirectories(fileUpload);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void saveToLocalFileDir(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.fileUpload.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Stream<Path> loadAll() throws IOException {
        return Files.walk(this.fileUpload, 1)
            .filter(path -> !path.equals(this.fileUpload))
            .map(this.fileUpload::relativize);
    }

    public Resource loadFile(String filename) {
        Path file = this.fileUpload.resolve(filename);
        Resource resource;
        try {
            resource = new UrlResource(file.toUri());
            return resource;
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException("Problem reading from file...");
        }
    }

    public void deleteAllFiles() {
        FileSystemUtils.deleteRecursively(fileUpload.toFile());
    }
}
