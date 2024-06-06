package ibf.nus.iss.day38_backend.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import ibf.nus.iss.day38_backend.models.FileInfo;
import ibf.nus.iss.day38_backend.models.ImageData;
import ibf.nus.iss.day38_backend.services.ImageService;

@Controller
@RequestMapping
public class FileController {
    
    @Autowired
    private ImageService imageSvc;

    
    //if you use file instead of myfile, it might conflict with the path above
    @GetMapping(path="/myfile/{pic_id}") 
    public ResponseEntity<ImageData> getMethodNameFrDB(@PathVariable("pic_id") String picId) {
        Optional<ImageData> resultImageData = imageSvc.getPicture(picId);

        if (resultImageData.isPresent()) {
            return ResponseEntity.ok().body(resultImageData.get());
        } else {
            return ResponseEntity.ok().body(null);
        }
    }


    @GetMapping(path="/list-files")
    public ResponseEntity<List<FileInfo>> getFileListFrDir() throws IOException {
        List<FileInfo> fileInfos = imageSvc.loadAll()
            .map(path -> {
                String filename = path.getFileName().toString();
                String fileURL = MvcUriComponentsBuilder
                    .fromMethodName(UploadController.class, "getFileByName", path.getFileName().toString())
                    .build()
                    .toString();
                return new FileInfo(filename, fileURL);
            }).collect(Collectors.toList());
        
        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }


    @GetMapping(path="/file/{filename:.+}")
    public ResponseEntity<Resource> getFileByNameFrDir(@PathVariable("filename") String param) {
        Resource resource = imageSvc.loadFile(param);

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment", "filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAllFilesFrDir() {
        imageSvc.deleteAllFiles();
        return ResponseEntity.status(HttpStatus.OK).body("Files successfully deleted.");
    }


    @GetMapping(path="/myS3file/{file_id}")
    public ResponseEntity<byte[]> getFileFromS3(@PathVariable("file_id") String fileId) {
        byte[] buffer = imageSvc.getFileFromS3(fileId);
        return ResponseEntity.status(HttpStatus.OK).body(buffer);
    }

}
