package ibf2023.csf.day35.backend.repositories;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import ibf2023.csf.day35.backend.models.*;

@Repository
public class GamesRepository {

	@Autowired
	private MongoTemplate template;

	public List<GameSummary> findGamesByName(String name) {
		Criteria criteria = Criteria.where("name").regex(name, "i");
		Query query = Query.query(criteria);
		query.fields().include("gid", "name");
		return template.find(query, Document.class, "games")
			.stream()
			.map(doc -> new GameSummary(
							doc.getInteger("gid", 0), doc.getString("name")
						)).toList();

	}
}
