package ibf.nus.iss.day38_backend.repositories;

import java.io.InputStream;
import java.sql.ResultSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf.nus.iss.day38_backend.models.ImageData;

@Repository
public class ImageRepo {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    public static final String SQL_INSERT_PICTURE = """
            insert into pictures (pic_id, content, mime) VALUES (?, ?, ?)
        """;

    public static final String SQL_GET_PICTURE_BY_ID = """
            select * from pictures where pic_id = ?
        """;

    public void save(String pic_id, InputStream is, String contentType) {
        jdbcTemplate.update(SQL_INSERT_PICTURE, pic_id, is, contentType);
    }   

    public Optional<ImageData> getPicture(String pic_id) {
        return jdbcTemplate.query(SQL_GET_PICTURE_BY_ID, (ResultSet rs) -> {

            if(!rs.next()) return Optional.empty();

            ImageData data = new ImageData(
                pic_id, 
                rs.getBytes("content"), 
                rs.getString("mime")
            );

            return Optional.of(data);
        }, pic_id);
    }
}
