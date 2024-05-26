package ibf.nus.iss.csf.day39workshopbackend.models;

// public record MarvelCharacter (
//     Integer id,
//     String name,
//     String description,
//     String thumbnailURL,
//     String resourceURI
// ) {}

public class MarvelCharacter {

    private Integer id;
    private String name;
    private String description;
    private String thumbnailURL;
    private String resourceURI;

    
    public MarvelCharacter(Integer id, String name, String description, String thumbnailURL, String resourceURI) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnailURL = thumbnailURL;
        this.resourceURI = resourceURI;
    }


    public MarvelCharacter() {
    }


    public Integer getId() {
        return id;
    }


    public void setId(Integer id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public String getThumbnailURL() {
        return thumbnailURL;
    }


    public void setThumbnailURL(String thumbnailURL) {
        this.thumbnailURL = thumbnailURL;
    }


    public String getResourceURI() {
        return resourceURI;
    }


    public void setResourceURI(String resourceURI) {
        this.resourceURI = resourceURI;
    }

    @Override
    public String toString() {
        return "MarvelCharacter [id=" + id + ", name=" + name + ", description=" + description + ", thumbnailURL="
                + thumbnailURL + ", resourceURI=" + resourceURI + "]";
    }
}