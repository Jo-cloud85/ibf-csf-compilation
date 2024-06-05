package ibf.nus.iss.day38_backend.controllers;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import ibf.nus.iss.day38_backend.exception.ResponseMessage;
import ibf.nus.iss.day38_backend.services.ImageService;

@Controller
@RequestMapping
public class UploadController {
    
    @Autowired
    private ImageService imageSvc;

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

    @PostMapping("/file-upload")
    public ResponseEntity<ResponseMessage> uploadFileToDirectory(
        @RequestBody MultipartFile file
    ) {
        try {
            imageSvc.save(file);
            String message = "File uploaded successfully";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception ex) {
            String message = ex.toString();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("/list-files")
    public ResponseEntity<List<String>> getFileList() throws IOException {
        List<String> fileInfos = imageSvc.loadAll()
            .map(path -> {
                String filename = path.getFileName().toString();
                return filename;
            }).collect(Collectors.toList());
        
        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<Resource> getFileByName(@PathVariable("filename") String param) {
        Resource resource = imageSvc.loadFile(param);

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment", "filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    
}
