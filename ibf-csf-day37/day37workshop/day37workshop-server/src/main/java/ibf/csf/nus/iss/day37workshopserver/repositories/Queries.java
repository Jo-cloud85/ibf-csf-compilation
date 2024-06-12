package ibf.csf.nus.iss.day37workshopserver.repositories;

public interface Queries {
    public static final String SQL_INSERT_POST = """
        INSERT INTO posts (post_id, comments, picture) 
        VALUES (?, ?, ?) 
        """;
    
    public static final String SQL_SELECT_POST_BY_ID = """
        SELECT post_id, comments, picture FROM posts WHERE post_id = ?;
        """;
}
