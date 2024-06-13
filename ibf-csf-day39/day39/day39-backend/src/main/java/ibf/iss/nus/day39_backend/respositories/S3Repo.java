package ibf.iss.nus.day39_backend.respositories;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

import ibf.iss.nus.day39_backend.utils.Utils;

@Repository
public class S3Repo {

    @Autowired
    private AmazonS3 s3;

    // SAVE
    public String saveToS3(MultipartFile uploadFile, String username) {

        String key = UUID.randomUUID().toString().substring(0, 8);

        try {
            Map<String, String> userData = new HashMap<>();
            userData.put("name", username);
            userData.put("filename", uploadFile.getOriginalFilename());

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(uploadFile.getContentType());
            metadata.setContentLength(uploadFile.getSize());
            metadata.setUserMetadata(userData);

            PutObjectRequest putRequest = new PutObjectRequest(Utils.S3_BUCKET_NAME, "%s".formatted(key), uploadFile.getInputStream(), metadata);
            putRequest.withCannedAcl(CannedAccessControlList.PublicRead);

            PutObjectResult result = s3.putObject(putRequest);
            System.out.println("PutObjectResult: " + result.getMetadata().toString());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return s3.getUrl(Utils.S3_BUCKET_NAME, key).toString();
    }

    // GET
    public byte[] getFileFrS3(String fileUrl) {
        String fileId = extractFileIdFromUrl(fileUrl);
        GetObjectRequest getRequest = new GetObjectRequest(Utils.S3_BUCKET_NAME, fileId); //fileId is the key which must match the data type on top
        S3Object result = s3.getObject(getRequest);
        ObjectMetadata metadata = result.getObjectMetadata();
        Map<String, String> userData = metadata.getUserMetadata();

        //System.out.println(userData);

        byte[] buffer = null;
    
        try (S3ObjectInputStream is = result.getObjectContent()) {
            buffer = is.readAllBytes();
        } catch (AmazonS3Exception ex) {
            ex.printStackTrace(); 
        } catch (Exception ex) {
            throw new RuntimeException("Error retrieving file from S3", ex); 
        }
        
        // Return the S3Object outside of the try-with-resources block to keep it open
        return buffer;
    }

    // DELETE
    public void deleteFileFrS3(String fileUrl) {
        String fileId = extractFileIdFromUrl(fileUrl);
        try {
            s3.deleteObject(new DeleteObjectRequest(Utils.S3_BUCKET_NAME, fileId)); //fileId is the key which must match the data type on top
        } catch (AmazonS3Exception ex) {
            System.err.println("Amazon S3 error: " + ex.getMessage());
            throw new RuntimeException("Error deleting file from S3", ex);
        } catch (Exception ex) {
            throw new RuntimeException("Unexpected error deleting file from S3", ex);
        }
    }

    
    private String extractFileIdFromUrl(String url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }
}
