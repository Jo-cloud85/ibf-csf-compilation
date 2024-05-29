package ibf2023.csf.day36.backend.controllers;

import java.io.StringReader;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class ProjectController {

	@PostMapping(path="/project", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<String> postProject(@RequestBody String payload) {
		JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject project = reader.readObject();
		System.out.printf(">>> project: %s\n", project.toString());

		return ResponseEntity.ok("{}");
	}
}
