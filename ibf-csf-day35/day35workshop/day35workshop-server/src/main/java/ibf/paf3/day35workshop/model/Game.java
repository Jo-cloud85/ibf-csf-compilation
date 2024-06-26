package ibf.paf3.day35workshop.model;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;

public class Game extends GameSummary {
    
    // order does not matter BUT name must match MongoDB collection column names exactly;

    private int year;
    private int ranking;
    private float average;
    private int users_rated;
    private String url;
    private String image;
    private LocalDateTime timestamp; //this is the one we added

    public Game() {
        this.timestamp = LocalDateTime.now();
    }

    public Game(ObjectId _id, String name, int year, int ranking, float average, int users_rated, 
        String url, String image, LocalDateTime timestamp) {
        super(_id, name);
        this.year = year;
        this.ranking = ranking;
        this.average = average;
        this.users_rated = users_rated;
        this.url = url;
        this.image = image;
        this.timestamp = timestamp;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getRanking() {
        return ranking;
    }

    public void setRanking(int ranking) {
        this.ranking = ranking;
    }

    public float getAverage() {
        return average;
    }

    public void setAverage(float average) {
        this.average = average;
    }

    public int getUsersRated() {
        return users_rated;
    }

    public void setUsersRated(int users_rated) {
        this.users_rated = users_rated;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String toString() {
        return "Boardgame [gameId=" + get_id() + ", name=" + getName() + ", year=" + year + ", ranking=" + ranking 
                + ", average=" + average + ", usersRated=" + users_rated + ", url=" + url + ", image=" + image 
                + ", timestamp=" + timestamp + "]";
    }
}
