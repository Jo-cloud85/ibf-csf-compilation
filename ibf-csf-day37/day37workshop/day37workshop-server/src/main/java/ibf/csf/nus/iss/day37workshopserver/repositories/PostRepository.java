package ibf.csf.nus.iss.day37workshopserver.repositories;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PostRepository implements Queries {

    @Autowired 
    private JdbcTemplate jdbcTemplate;

    public void savePost(String postId, String comments, InputStream picture) {
        try {
            jdbcTemplate.update(SQL_INSERT_POST, postId, comments, picture);
        } catch (DataAccessException e) {
            e.printStackTrace();
            throw new RuntimeException("Error saving post to database", e);
        }
    }
}
