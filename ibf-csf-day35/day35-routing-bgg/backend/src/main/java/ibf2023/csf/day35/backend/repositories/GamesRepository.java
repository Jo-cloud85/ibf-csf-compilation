package ibf2023.csf.day35.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf2023.csf.day35.backend.models.*;

@Repository
public class GamesRepository {

	@Autowired
	private MongoTemplate template;

	/* 
		db.games.find(
			{ name: { $regex: 'chess', $options: 'i' }},
			{ gid: 1, name: 1, _id: 0 }
		)
	*/
	public List<GameSummary> findGamesByName(String name) {
		Criteria criteria = Criteria.where("name").regex(name, "i");
		Query query = Query.query(criteria);
		query.fields().include("gid", "name");
		return template.find(query, Document.class, "games")
			.stream()
			.map(doc -> new GameSummary(
							doc.getInteger("gid", 0),
							doc.getString("name")
					)).toList();
	}

  /*
    db.games.aggregate([
      { $match: { gid: 233078 }},
      { $lookup: {
        from: 'comments',
        foreignField: 'gid',
        localField: 'gid',
        as: 'comments',
        pipeline: [
          { $sort: { rating: -1 }},
          { $limit: 5 }
        ]
      }}
    ])
  */
	public Optional<GameDetail> getGameDetailsAndComments(int gameId) {
		MatchOperation findGameByGid = Aggregation.match(Criteria.where("gid").is(gameId));

		SortOperation sortByRating = Aggregation.sort(Direction.DESC, "rating");
		LimitOperation take5 = Aggregation.limit(5);

		LookupOperation getCommentsForGame = LookupOperation.newLookup()
				.from("comments")
				.localField("gid")
				.foreignField("gid")
				.pipeline(sortByRating, take5)
				.as("comments");

		Aggregation pipeline = Aggregation.newAggregation(findGameByGid, getCommentsForGame);
		List<Document> results = template.aggregate(pipeline, "games", Document.class).getMappedResults();

		if (results.isEmpty())
			return Optional.empty();

		Document doc = results.getFirst();

    // Getting the comments from the results from collection 'games'
		List<Comment> comments = doc.getList("comments", Document.class)
				.stream()
				.map(d -> {
					Comment comment = new Comment(
						d.getString("user"), 
						d.getInteger("gid"), 
						d.getInteger("rating"), 
						d.getString("c_text")
					);
					return comment;
				}).toList();

    // And then formatting into GameDetail
		return Optional.of(
			new GameDetail(
				doc.getInteger("gid"), 
				doc.getString("name"),
				doc.getString("image"), 
				doc.getString("url"), 
				comments
			)
		);
	}
}
