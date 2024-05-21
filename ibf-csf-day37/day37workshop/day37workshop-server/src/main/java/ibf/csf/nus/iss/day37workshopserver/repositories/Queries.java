package ibf.csf.nus.iss.day37workshopserver.repositories;

public interface Queries {
    public static final String SQL_INSERT_POST = """
        INSERT INTO posts (post_id, comments, picture) 
        VALUES (?, ?, ?) 
        """;
}
