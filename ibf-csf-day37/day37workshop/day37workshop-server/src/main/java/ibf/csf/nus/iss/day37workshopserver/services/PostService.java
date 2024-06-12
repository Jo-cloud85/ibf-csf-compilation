package ibf.csf.nus.iss.day37workshopserver.services;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf.csf.nus.iss.day37workshopserver.models.Post;
import ibf.csf.nus.iss.day37workshopserver.repositories.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepo;

    public void savePost(String postId, String comments, InputStream pictureStream) {
        postRepo.savePost(postId, comments, pictureStream);
    }

    public Post getPost(String postId) {
        return postRepo.getPostById(postId).get();
    }
}
