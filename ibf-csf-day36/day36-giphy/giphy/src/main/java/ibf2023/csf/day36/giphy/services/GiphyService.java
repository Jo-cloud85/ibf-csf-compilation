package ibf2023.csf.day36.giphy.services;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class GiphyService {

   public static final String URL = "https://api.giphy.com/v1/gifs/search";

   @Value("${giphy.key}")
   private String giphyKey;

   public List<String> search(String q, int limit) {
      String url = UriComponentsBuilder.fromUriString(URL)
            .queryParam("api_key", giphyKey)
            .queryParam("q", q.replaceAll(" ", "+")) // replace spaces with +
            .queryParam("limit", limit)
            .build()
            .toUriString();

      // Make the call
      RequestEntity<Void> req = RequestEntity.get(url).build();
      RestTemplate template = new RestTemplate();
      ResponseEntity<String> resp = template.exchange(req, String.class);

      // Extract .data[].images.downsized_medium.url
      JsonReader reader = Json.createReader(new StringReader(resp.getBody()));
      JsonObject payload = reader.readObject();
      return payload.getJsonArray("data").stream()
            .map(item -> item.asJsonObject())
            .map(json -> json.getJsonObject("images")
                .getJsonObject("downsized_medium")
                .getString("url"))
            .toList();
   }
}
