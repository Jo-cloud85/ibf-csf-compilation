package ibf.paf3.day35workshop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf.paf3.day35workshop.model.Game;
import ibf.paf3.day35workshop.model.GameSummary;
import ibf.paf3.day35workshop.repo.GameRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@Service
public class GameService {
    
    @Autowired
    private GameRepository boardgameRepo;

    public long getTotalBoardgamesCount(String substrName) {
        return boardgameRepo.getTotalBoardgamesCount(substrName);
    }

    // Finding Boardgames by name with pagination ---------------------------------------------------
    public List<GameSummary> findBoardgamesByNameWithPagination(
        String substrName, int limit, int offset) {
        return boardgameRepo.findBoardgamesByNameWithPagination(substrName, limit, offset);
    }

    public JsonObject findBoardgamesByNameWithPaginationInJson(
        String substrName, int limit, int offset) {
        List<GameSummary> list = findBoardgamesByNameWithPagination(substrName, limit, offset);
        return convertBoardgameSearchResultsToJson(list, substrName, limit, offset);
    }

    // Finding Boardgames by name with pagination and rank ------------------------------------------
    public List<GameSummary> findBoardgamesByNameWithPaginationAndRank(
        String substrName, int limit, int offset) { 
        return boardgameRepo.findBoardgamesByNameWithPaginationAndRank(substrName, limit, offset);
    }

    public JsonObject findBoardgamesByNameWithPaginationAndRankInJson(
        String substrName, int limit, int offset) {
        List<GameSummary> listwRank = findBoardgamesByNameWithPaginationAndRank(substrName, limit, offset);
        return convertBoardgameSearchResultsToJson(listwRank, substrName, limit, offset);
    }

    public JsonObject convertBoardgameSearchResultsToJson(
        List<GameSummary> list, String substrName, int limit, int offset) {
        List<GameSummary> boardgameSummaryList = list;

        // YOU CANNOT DIRECTLY create JsonArray from a List<BoardgameSummary>!! You have to iterate through.
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for (GameSummary boardgame : boardgameSummaryList) {
            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder()
                    .add("game_id", boardgame.get_id().toString())
                    .add("name", boardgame.getName());
            jsonArrayBuilder.add(jsonObjectBuilder.build());
        }
        JsonArray jsonArr = jsonArrayBuilder.build();
        
        return Json.createObjectBuilder()
            .add("games", jsonArr)
            .add("offset", offset)
            .add("limit", limit)
            .add("total", getTotalBoardgamesCount(substrName))
            .add("timestamp", LocalDateTime.now().toString())
            .build();
    }

    // Finding Boardgame by Id ----------------------------------------------------------------------
    public Game findBoardgameById(String idStr) {
        try {
            ObjectId objId = new ObjectId(idStr);
            // System.out.println(boardgameRepo.findBoardgameById(objId));
            return boardgameRepo.findBoardgameById(objId);
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid ObjectId: " + idStr);
            e.printStackTrace();
            return null;
        }
    }

    public JsonObject findBoardgameByIdInJson(String idStr) {
        return boardgameToJson(findBoardgameById(idStr));
    }

    public JsonObject boardgameToJson(Game boardgame) {
        // System.out.println(boardgame);
        return Json.createObjectBuilder()
            .add("game_id", boardgame.get_id().toString())
            .add("name", boardgame.getName())
            .add("year", boardgame.getYear())
            .add("ranking", boardgame.getRanking())
            .add("users_rated", boardgame.getUsersRated())
            .add("url", boardgame.getUrl())
            .add("thumbnail", boardgame.getImage())
            .add("timestamp", boardgame.getTimestamp().toString())
            .build();
    }
}
