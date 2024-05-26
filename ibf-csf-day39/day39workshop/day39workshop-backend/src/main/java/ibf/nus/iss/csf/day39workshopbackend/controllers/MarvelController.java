package ibf.nus.iss.csf.day39workshopbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf.nus.iss.csf.day39workshopbackend.models.MarvelCharacter;
import ibf.nus.iss.csf.day39workshopbackend.services.MarvelService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@RestController
@RequestMapping
public class MarvelController {

    @Autowired
    private MarvelService marvelSvc;
    
    @GetMapping(path = "/")
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
}
