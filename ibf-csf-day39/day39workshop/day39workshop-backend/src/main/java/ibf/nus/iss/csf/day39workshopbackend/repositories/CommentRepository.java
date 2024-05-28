package ibf.nus.iss.csf.day39workshopbackend.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf.nus.iss.csf.day39workshopbackend.models.Comment;

@Repository
public class CommentRepository {
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Comment> getCommentsForChar(Integer characterId) {
        Query query = new Query(
            Criteria
                .where("characterId")
                .is(characterId))
                .limit(10) // Fetch only the 10 most recent comments
                .with(Sort.by(Sort.Direction.DESC, "timestamp"));

        return mongoTemplate.find(query, Comment.class);
    }

    public void saveComment(Comment comment) {
        System.out.println(">>> From Comment Repo" + comment.toString());
        mongoTemplate.save(comment);
    }
}
