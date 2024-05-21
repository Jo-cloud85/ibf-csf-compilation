package ibf.csf.nus.iss.day37workshopserver.controllers;

import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ibf.csf.nus.iss.day37workshopserver.services.PostService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class PostController {

    @Autowired
    private PostService postSrv;

    @PostMapping(value = "/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPost(
        @RequestPart("comments") String comments,
        @RequestPart("picture") MultipartFile pictureFile) {

        try {
            System.out.println("Received comments: " + comments);
            System.out.println("Received file name: " + pictureFile.getOriginalFilename());
            System.out.println("Received file mediatype: " + pictureFile.getContentType());
            InputStream pictureStream = pictureFile.getInputStream();
            String postId = UUID.randomUUID().toString().substring(0, 8);
            postSrv.savePost(postId, comments, pictureStream);
            return new ResponseEntity<>("Post created successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Log the stack trace to understand the issue
            return new ResponseEntity<>("Error while processing the picture", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
