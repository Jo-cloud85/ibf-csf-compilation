package ibf.paf3.day35workshop.repo;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf.paf3.day35workshop.model.Game;
import ibf.paf3.day35workshop.model.GameSummary;

@Repository
public class GameRepository {
    
    @Autowired
    private MongoTemplate template;

    /*
        db.games.find(
            {
                name: { $regex: 'button', $options: 'i' }   
            }
        ).count();
     */
    public long getTotalBoardgamesCount(String substrName) {
        Query query = new Query(
            Criteria.where("name")
                    .regex(substrName, "i")
        ); 
        return template.count(query, "games");
    }

    /*
        db.games.find(
            {
                name: { $regex: 'button', $options: 'i' }   
            }
        ).skip(0).limit(25)
     */
    public List<GameSummary> findBoardgamesByNameWithPagination(String substrName, int limit, int offset) {
        Query query = new Query(
            Criteria.where("name")
                    .regex(substrName, "i")
        ); 
        query
            .skip(limit*offset)
            .limit(limit);
        return template.find(query, GameSummary.class, "games");
    }

    /*
        db.games.find(
            {
                name: { $regex: 'button', $options: 'i' }   
            }
        )
        .skip(0).limit(25)
        .sort({ rank: 1 })
     */
    public List<GameSummary> findBoardgamesByNameWithPaginationAndRank(String substrName, int limit, int offset) {
        Query query = new Query(
            Criteria.where("name")
                    .regex(substrName, "i")
        ); 
        query
            .skip(limit*offset)
            .limit(limit)
            .with(Sort.by(Sort.Direction.ASC, "ranking"));
        return template.find(query, GameSummary.class, "games");
    }

    /*
        db.games.find(
            {
                _id: ObjectId('65b32e122da1824ea35a3b7b')   
            }
        )
     */
    public Game findBoardgameById(ObjectId objId) {
        Query query = new Query(
            Criteria.where("_id").is(objId)
        );
        return template.findOne(query, Game.class, "games");
    }
}
