package ibf2023.csf.day35.backend.models;

import java.util.List;

public record GameDetail(int gameId, String name, String image, String url, List<Comment> comments) { }