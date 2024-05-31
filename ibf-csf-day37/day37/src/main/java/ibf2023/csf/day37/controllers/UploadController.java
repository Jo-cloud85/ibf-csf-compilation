package ibf2023.csf.day37.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import ibf2023.csf.day37.services.UploadService;

@Controller
@RequestMapping
public class UploadController {

    @Autowired
    private UploadService uploadSvc;

    @PostMapping(path="/upload", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ModelAndView postUpload(
        @RequestPart String title, 
        @RequestPart String description,
        @RequestPart MultipartFile mypic) {

        ModelAndView mav = new ModelAndView();
        mav.setViewName("upload");

        try {
            String url = uploadSvc.upload(mypic);
            mav.addObject("url", url);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        mav.addObject("title", title);
        mav.addObject("description", description);
        mav.addObject("originalFilename", mypic.getOriginalFilename());
        mav.addObject("size", mypic.getSize());
        mav.addObject("contentType", mypic.getContentType());

        return mav;
    }
}
