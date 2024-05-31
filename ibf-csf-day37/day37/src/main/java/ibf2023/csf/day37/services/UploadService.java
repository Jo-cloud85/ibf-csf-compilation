package ibf2023.csf.day37.services;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class UploadService {

    @Autowired
    private AmazonS3 s3;

    public String upload(MultipartFile file) throws IOException {

        // User metadata
        Map<String, String> userdata = new HashMap<>();
        userdata.put("upload-timestamp", (new Date()).toString());
        userdata.put("name", "chuk");
        userdata.put("filename", file.getOriginalFilename());

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        metadata.setUserMetadata(userdata);

        String key = UUID.randomUUID().toString().substring(0, 8);

        // The 1st parameter is the bucket name
        PutObjectRequest putReq = new PutObjectRequest("day37s3", key, file.getInputStream(), metadata);
        // Make the object publicly available (not necessary)
        putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);

        // PutObjectResult result = s3.putObject

        s3.putObject(putReq);

        return s3.getUrl("day37s3", key).toString();
    }
}
