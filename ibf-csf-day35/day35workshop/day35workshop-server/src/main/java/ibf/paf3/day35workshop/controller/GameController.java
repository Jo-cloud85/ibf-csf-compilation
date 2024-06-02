package ibf.paf3.day35workshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf.paf3.day35workshop.exception.NoMatchFoundException;
import ibf.paf3.day35workshop.service.GameService;

@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class GameController {

    @Autowired
    private GameService boardgameSvc;
    
    // You are trying to get the parameters from the URL directly so you cannot use @RequestBody since this is 
    // not a PostMapping i.e. no payload and you also cannot use MultiValueMap (there is no HTML form)

    // 1. Search boardgames by name
    // Example: http://localhost:8080/games?name=star
    @GetMapping("/games")
    public ResponseEntity<String> searchBoardgamesByName (
        @RequestParam(required = true, name = "name") String substrName,
        @RequestParam(defaultValue = "50") int limit,
        @RequestParam(defaultValue = "0") int offset) throws NoMatchFoundException{

        return new ResponseEntity<String>(
            boardgameSvc.findBoardgamesByNameWithPaginationInJson(substrName, limit, offset).toString(), 
            HttpStatus.OK
        );
    }

    // 2. Search boardgames by rank
    // Example: http://localhost:8080/games/rank?name=star
    @GetMapping("/games/rank")
    public ResponseEntity<String> searchBoardgamesByNameWRank (
        @RequestParam(required = true, name = "name") String substrName,
        @RequestParam(defaultValue = "50") int limit,
        @RequestParam(defaultValue = "0") int offset) throws NoMatchFoundException{

        return new ResponseEntity<String>(
            boardgameSvc.findBoardgamesByNameWithPaginationAndRankInJson(substrName, limit, offset).toString(), 
            HttpStatus.OK
        );
    }

    // 3. Get details of game by game_id
    // Example: http://localhost:8080/games/65b32e132da1824ea35a7b6b
    @GetMapping("/games/{game_id}")
    public ResponseEntity<String> searchBoardgameById(
        @PathVariable("game_id") String idStr) throws NoMatchFoundException {

        // System.out.println(boardgameSvc.findBoardgameByIdInJson(idStr).toString());

        return new ResponseEntity<String>(
                boardgameSvc.findBoardgameByIdInJson(idStr).toString(), 
                HttpStatus.OK
            );
    }
}
