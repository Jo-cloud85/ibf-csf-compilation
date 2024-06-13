package ibf.iss.nus.day39_backend.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String profileUrl;

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("firstName", firstName)
            .add("lastName", lastName)
            .add("email", email)
            .add("profileUrl", profileUrl)
            .build();
    }

    public JsonObjectBuilder toJsonBuilder() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("firstName", firstName)
            .add("lastName", lastName)
            .add("email", email)
            .add("profileUrl", profileUrl);
    }
}
