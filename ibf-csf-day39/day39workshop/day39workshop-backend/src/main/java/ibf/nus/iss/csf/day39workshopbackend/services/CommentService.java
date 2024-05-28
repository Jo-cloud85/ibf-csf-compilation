package ibf.nus.iss.csf.day39workshopbackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf.nus.iss.csf.day39workshopbackend.models.Comment;
import ibf.nus.iss.csf.day39workshopbackend.repositories.CommentRepository;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepo;

    public List<Comment> getCommentsForChar (Integer characterId) {
        return commentRepo.getCommentsForChar(characterId);
    }

    public void addCommentToChar(Integer characterId, Comment comment) {
        commentRepo.saveComment(comment);
    }
}
