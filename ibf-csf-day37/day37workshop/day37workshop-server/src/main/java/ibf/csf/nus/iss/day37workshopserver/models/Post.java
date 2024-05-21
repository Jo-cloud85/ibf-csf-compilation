package ibf.csf.nus.iss.day37workshopserver.models;

public class Post {
    private String postId;
    private String comments;
    private byte[] picture;

    public Post() {}

    public Post(String postId, String comments, byte[] picture) {
        this.postId = postId;
        this.comments = comments;
        this.picture = picture;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }
}
