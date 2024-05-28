package ibf.nus.iss.csf.day39workshopbackend.models;

import java.time.LocalDateTime;

public class Comment {
    private Integer id;
    private Integer characterId;
    private String text;
    private LocalDateTime timestamp;
    
    public Comment() {
    }

    public Comment(Integer id, Integer characterId, String text, LocalDateTime timestamp) {
        this.id = id;
        this.characterId = characterId;
        this.text = text;
        this.timestamp = timestamp;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
        return "Comment [id=" + id + ", characterId=" + characterId + ", text=" + text + ", timestamp=" + timestamp
                + "]";
    }
}
