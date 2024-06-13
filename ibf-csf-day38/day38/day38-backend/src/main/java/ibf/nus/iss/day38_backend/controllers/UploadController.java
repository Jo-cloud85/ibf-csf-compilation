package ibf.nus.iss.day38_backend.controllers;

import java.io.IOException;
import java.io.StringWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import ibf.nus.iss.day38_backend.exception.ResponseMessage;
import ibf.nus.iss.day38_backend.services.ImageService;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonWriter;

@Controller
@RequestMapping
public class UploadController {
    
    @Autowired
    private ImageService imageSvc;


    @SuppressWarnings("null")
    @PostMapping(path="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ModelAndView postFileUpload(
        @RequestPart MultipartFile myfile,
        @RequestPart String comments
    ) throws IOException {

        ModelAndView mav = new ModelAndView("picturefile");
        System.out.println("myfile input stream >>> " + myfile.getInputStream().toString());
        System.out.println("myfile original filename >>> " + myfile.getOriginalFilename().toString());
        System.out.println("myfile size >>> " + myfile.getSize());

        imageSvc.saveToDB(myfile.getInputStream(), myfile.getContentType());

        mav.addObject("comments",comments);
        
        return mav;
    }

    // This is for Angular because Angular only expects JSON
    @SuppressWarnings("null")
    @PostMapping(path="/uploads3", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postFileUploadToS3(
        @RequestPart MultipartFile myfile,
        @RequestPart String comments
    ) throws IOException {
        
        System.out.println("myfile input stream >>> " + myfile.getInputStream().toString());
        System.out.println("myfile original filename >>> " + myfile.getOriginalFilename().toString());
        System.out.println("myfile size >>> " + myfile.getSize());

        String url = imageSvc.saveToS3(myfile);

        JsonObject jsonObj = Json.createObjectBuilder()
            .add("myfile", myfile.toString())
            .add("comments", comments)
            .build();
        
        StringWriter stringWriter = new StringWriter();
        try (JsonWriter jsonWriter = Json.createWriter(stringWriter)) {
            jsonWriter.writeObject(jsonObj);
        }
        
        return ResponseEntity.status(200).body(stringWriter.toString());
    }

    // This is if you are using thymeleaf to display your data
    // @PostMapping(path="/uploads3", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    // public ModelAndView postFileUploadToS3(
    //     @RequestPart MultipartFile myfile,
    //     @RequestPart String comments
    // ) throws IOException {

    //     ModelAndView mav = new ModelAndView("picturefile");
        
    //     System.out.println("myfile input stream >>> " + myfile.getInputStream().toString());
    //     System.out.println("myfile original filename >>> " + myfile.getOriginalFilename().toString());
    //     System.out.println("myfile size >>> " + myfile.getSize());

    //     String url = imageSvc.saveToS3(myfile);

    //     mav.addObject("imageURL", url);
    //     mav.addObject("comments",comments);
        
    //     return mav;
    // }


    //////////////////////////////////////// ADDITIONAL /////////////////////////////////////////////
    @PostMapping("/file-upload")
    public ResponseEntity<ResponseMessage> uploadFileToDirectory(@RequestBody MultipartFile file) {
        try {
            imageSvc.saveToLocalFileDir(file);
            String message = "File uploaded successfully";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception ex) {
            String message = ex.toString();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }
}
