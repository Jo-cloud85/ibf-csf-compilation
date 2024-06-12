package ibf2023.csf.day36.giphy.controllers;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ibf2023.csf.day36.giphy.services.GiphyService;
import jakarta.json.Json;
import jakarta.json.JsonArray;

@Controller 
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class GiphyController {

  private Logger logger = Logger.getLogger(GiphyController.class.getName());

  @Autowired
  private GiphyService giphySvc;

  @GetMapping("/search")
  @ResponseBody
  public ResponseEntity<String> Search(
        @RequestParam(required=true) String q,
        @RequestParam(defaultValue="10") int limit) {

    logger.log(Level.INFO, "SEARCH: q=%s, limit=%d".formatted(q, limit));

    JsonArray result = Json.createArrayBuilder(giphySvc.search(q, limit)).build();
    
    return ResponseEntity.ok(result.toString());
  }
}
