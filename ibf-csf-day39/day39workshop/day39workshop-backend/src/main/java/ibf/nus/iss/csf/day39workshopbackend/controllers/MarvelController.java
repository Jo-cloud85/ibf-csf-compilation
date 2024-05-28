package ibf.nus.iss.csf.day39workshopbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf.nus.iss.csf.day39workshopbackend.models.Comment;
import ibf.nus.iss.csf.day39workshopbackend.models.MarvelCharacter;
import ibf.nus.iss.csf.day39workshopbackend.services.CommentService;
import ibf.nus.iss.csf.day39workshopbackend.services.MarvelService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path="/api")
public class MarvelController {

    @Autowired
    private MarvelService marvelSvc;

    @Autowired
    private CommentService commentSvc;
    
    @GetMapping(path = "/characters")
    public ResponseEntity<String> getListofChar(
            @RequestParam("q") String nameStartsWith,
            @RequestParam(defaultValue = "25") Integer limit,
            @RequestParam(defaultValue = "0") Integer offset) {
        
        try {
            List<MarvelCharacter> result = marvelSvc.getListofCharsFrApi(nameStartsWith, limit, offset);

            if (result.isEmpty()) {
                return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .body("No characters found with the given criteria.");
            }

            JsonArrayBuilder jsonArr = Json.createArrayBuilder();

            for (MarvelCharacter mc : result) {
                JsonObject jsonObj = Json.createObjectBuilder()
                    .add("id", mc.getId())
                    .add("name", mc.getName())
                    .add("description", mc.getDescription())
                    .add("thumbnailURL", mc.getThumbnailURL())
                    .add("resourceURI", mc.getResourceURI())
                    .build();
                jsonArr.add(jsonObj);
            }
            return ResponseEntity.ok(jsonArr.build().toString());

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred. Please try again later.");
        }
    }

    
    @GetMapping(path = "/characters/{characterId}")
    public ResponseEntity<String> getCharById (@PathVariable("characterId") Integer id) {
        try {
            MarvelCharacter result = marvelSvc.getCharById(id);

            if (result == null) {
                return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .body("No character found with the given characterId.");
            }

            List<Comment> comments = commentSvc.getCommentsForChar(id);

            JsonArrayBuilder jsonArr = Json.createArrayBuilder();

            for ( Comment c : comments) {
                JsonObject jsonObj = Json.createObjectBuilder()
                    .add("id", c.getId())
                    .add("characterId", c.getCharacterId())
                    .add("text", c.getText())
                    .add("timestamp", c.getTimestamp().toString())
                    .build();
                
                jsonArr.add(jsonObj);
            }

            JsonObject jsonObj = Json.createObjectBuilder()
                .add("id", result.getId())
                .add("name", result.getName())
                .add("description", result.getDescription())
                .add("thumbnailURL", result.getThumbnailURL())
                .add("resourceURI", result.getResourceURI())
                .add("comments", jsonArr.build())
                .build();

            return ResponseEntity.ok(jsonObj.toString());

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred. Please try again later.");
        }
    }
}
