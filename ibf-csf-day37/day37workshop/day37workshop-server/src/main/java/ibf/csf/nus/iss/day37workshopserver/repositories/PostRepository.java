package ibf.csf.nus.iss.day37workshopserver.repositories;

import java.io.InputStream;
import java.sql.ResultSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf.csf.nus.iss.day37workshopserver.models.Post;

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

    public Optional<Post> getPostById(String postId) {
        try {
            return jdbcTemplate.query(
                SQL_SELECT_POST_BY_ID, (ResultSet rs) -> {
                    if (!rs.next()) return Optional.empty();

                    Post post = new Post();
                    post.setPostId(rs.getString("post_id"));
                    post.setComments(rs.getString("comments"));
                    post.setPicture(rs.getBytes("picture"));
                    return Optional.of(post);
                }, postId);
        } catch (DataAccessException e) {
            e.printStackTrace();
            throw new RuntimeException("Error retrieving post from database", e);
        }
    }
}
