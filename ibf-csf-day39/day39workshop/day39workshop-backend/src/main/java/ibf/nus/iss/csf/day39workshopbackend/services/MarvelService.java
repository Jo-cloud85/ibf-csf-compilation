package ibf.nus.iss.csf.day39workshopbackend.services;

import java.io.StringReader;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf.nus.iss.csf.day39workshopbackend.models.MarvelCharacter;
import ibf.nus.iss.csf.day39workshopbackend.repositories.MarvelRepository;
import ibf.nus.iss.csf.day39workshopbackend.utils.MarvelApiUtil;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class MarvelService {

    @Value("${marvel.apikey}")
    private String apikey;

    @Value("${marvel.privatekey}")
    private String privatekey;

    @Autowired
    private MarvelRepository marvelRepo;

    public static final String BASE_URL = "https://gateway.marvel.com/v1/public/characters";

    public List<MarvelCharacter> getListofCharsFrApi(String nameStartsWith, Integer limit, Integer offset) {
        String ts = String.valueOf(System.currentTimeMillis());
        String hash = MarvelApiUtil.generateMd5Hash(ts, privatekey, apikey);

        String url =  UriComponentsBuilder
            .fromUriString(BASE_URL)
            .queryParam("ts", ts)
            .queryParam("apikey", apikey)
            .queryParam("hash", hash)
            .queryParam("nameStartsWith", nameStartsWith)
            .queryParam("limit", limit)
            .queryParam("offset", offset)
            .toUriString();
        
        RequestEntity<Void> req = RequestEntity
            .get(url)
            .accept(MediaType.APPLICATION_JSON)
            .build();
        
        ResponseEntity<String> resp;

        try {
            RestTemplate template = new RestTemplate();
            resp = template.exchange(req, String.class);
        } catch (Exception ex) {
            ex.printStackTrace();
            return List.of();
        }

        JsonReader reader = Json.createReader(new StringReader(resp.getBody()));
        JsonArray results = reader.readObject()
                                .getJsonObject("data")
                                .getJsonArray("results");

        List<MarvelCharacter> characterList = results.stream()
            .map(value -> (JsonObject) value)
            .map(c -> new MarvelCharacter(
                c.getInt("id"),
                c.getString("name"),
                c.getString("description"),
                c.getJsonObject("thumbnail").getString("path") + "." + c.getJsonObject("thumbnail").getString("extension"),
                c.getString("resourceURI")
            ))
            .collect(Collectors.toList());
        
        // Cache individual character details into Redis with a cache expiration of 1 hour
        characterList.forEach(character -> marvelRepo.saveCharToRedis(character, 3600)); // 3600 seconds = 1 hour

        return characterList;
    }


    public MarvelCharacter getCharById(Integer id) {
        String ts = String.valueOf(System.currentTimeMillis());
        String hash = MarvelApiUtil.generateMd5Hash(ts, privatekey, apikey);

        MarvelCharacter character = marvelRepo.getCharByIdFrRedis(id);

        if (character != null) return character;

        String url =  UriComponentsBuilder
            .fromUriString(BASE_URL)
            .pathSegment(id.toString()) // Include the character ID in the path
            .queryParam("ts", ts)
            .queryParam("apikey", apikey)
            .queryParam("hash", hash)
            .toUriString();

        ResponseEntity<String> resp;

        try {
            RestTemplate template = new RestTemplate();
            resp = template.getForEntity(url, String.class);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }

        JsonReader reader = Json.createReader(new StringReader(resp.getBody()));
        JsonObject data = reader.readObject()
                                .getJsonObject("data")
                                .getJsonArray("results")
                                .getJsonObject(0);
        
        character = new MarvelCharacter(
            data.getInt("id"),
            data.getString("name"),
            data.getString("description"),
            data.getJsonObject("thumbnail").getString("path") + "." + data.getJsonObject("thumbnail").getString("extension"),
            data.getString("resourceURI")
        );

        // Cache the character details in Redis for 1 hour
        marvelRepo.saveCharToRedis(character, 3600);

        return character;
    }
}
