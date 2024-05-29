package ibf2023.csf.day36.giphy.services;

import java.io.StringReader;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class GiphyService {
    
    @Value("${giphy.key}")
    private String giphyKey;

    public static final String BASE_URL = "https://api.giphy.com/v1/gifs/search";

    public List<String> search(String q, int limit) {

        String url =  UriComponentsBuilder
            .fromUriString(BASE_URL)
            .queryParam("api_key", giphyKey)
            .queryParam("q", q)
            .queryParam("limit", limit)
            .queryParam("offset", 0)
            .queryParam("rating", "g")
            .queryParam("lang", "en")
            .queryParam("bundle", "messaging_non_clips")
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
                                .getJsonArray("data");
                                // .getJsonObject("images")
                                // .getJsonArray("fixed_width_downsampled");

        

        List<String> giphyList = results.stream()
            .map(value -> (JsonObject) value)
            .map(c -> c.getString("images.fixed_height_downsampled.url"))
            .collect(Collectors.toList());

        System.out.println(giphyList);

        return giphyList;
    }
}
