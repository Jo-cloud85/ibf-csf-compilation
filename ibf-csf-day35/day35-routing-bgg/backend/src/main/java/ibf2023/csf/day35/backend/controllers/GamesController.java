package ibf2023.csf.day35.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ibf2023.csf.day35.backend.models.GameDetail;
import ibf2023.csf.day35.backend.repositories.GamesRepository;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class GamesController {

	@Autowired
	private GamesRepository gamesRepo;

	@GetMapping(path="/search")
	@ResponseBody
	public ResponseEntity<String> search(@RequestParam String q) {
		JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
		gamesRepo.findGamesByName(q).stream()
			.map(g -> Json.createObjectBuilder()
					.add("gameId", g.gameId())
					.add("name", g.name())
					.build())
			.forEach(j -> {
				arrBuilder.add(j);
			});
		return ResponseEntity.ok(arrBuilder.build().toString());
	}

	@GetMapping(path="/game/{gameId}")
	@ResponseBody
	public ResponseEntity<String> getGameDetails(@PathVariable int gameId) {
		Optional<GameDetail> opt = gamesRepo.getGameDetailsAndComments(gameId);
		if (opt.isEmpty())
			return ResponseEntity.status(404).body(
				Json.createObjectBuilder().add("message", "Cannot find game %d".formatted(gameId))
					.build().toString()
			);
		JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
		GameDetail game = opt.get();
		game.comments().stream()
			.forEach(c -> {
				arrBuilder.add(
					Json.createObjectBuilder()
						.add("user", c.user())
						.add("gameId", c.gameId())
						.add("rating", c.rating())
						.add("text", c.text())
						.build()
				);
			});
		JsonObject result = Json.createObjectBuilder()
			.add("gameId", game.gameId())
			.add("name", game.name())
			.add("image", game.image())
			.add("url", game.url())
			.add("comments", arrBuilder.build())
			.build();
		return ResponseEntity.ok(result.toString());
	}
}
