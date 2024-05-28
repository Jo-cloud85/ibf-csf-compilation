package ibf.nus.iss.csf.day39workshopbackend.models;

import java.time.LocalDateTime;

public class Comment {
    private String commentId;
    private Integer characterId;
    private String text;
    private LocalDateTime timestamp;
    
    public Comment() {
    }

    public Comment(Integer characterId, String text) {
        this.characterId = characterId;
        this.text = text;
        this.timestamp = LocalDateTime.now();
    }

    // public Comment(Integer id, Integer characterId, String text, LocalDateTime timestamp) {
    //     this.id = id;
    //     this.characterId = characterId;
    //     this.text = text;
    //     this.timestamp = timestamp;
    // }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public Integer getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Integer characterId) {
        this.characterId = characterId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Comment [commentId=" + commentId + ", characterId=" + characterId + ", text=" + text + ", timestamp=" + timestamp
                + "]";
    }
}
