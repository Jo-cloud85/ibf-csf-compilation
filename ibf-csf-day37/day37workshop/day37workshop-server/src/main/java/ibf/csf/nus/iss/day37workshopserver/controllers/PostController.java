package ibf.csf.nus.iss.day37workshopserver.controllers;

import java.io.InputStream;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ibf.csf.nus.iss.day37workshopserver.models.Post;
import ibf.csf.nus.iss.day37workshopserver.services.PostService;
import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;

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

            JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder()
                .add("postId", postId);
            String jsonStr = jsonObjBuilder.build().toString();

            return ResponseEntity
                .status(HttpStatus.OK)
                .body(jsonStr);

        } catch (Exception e) {
            e.printStackTrace(); // Log the stack trace to understand the issue

            JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder()
                .add("error", "Error while processing the picture");
            String jsonStr = jsonObjBuilder.build().toString();

            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(jsonStr);
        }
    }


    @GetMapping("/post/{postId}")
    public ResponseEntity<String> getPost(@PathVariable String postId) {
        Post post = postSrv.getPost(postId);

        String pictureBase64 = Base64.getEncoder().encodeToString(post.getPicture());

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder()
                .add("postId", post.getPostId())
                .add("comments", post.getComments())
                .add("pictureStr", pictureBase64);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(jsonObjBuilder.build().toString());
    }
}
