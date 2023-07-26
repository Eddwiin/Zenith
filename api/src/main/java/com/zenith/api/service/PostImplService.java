package com.zenith.api.service;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.dto.mapper.SavedPostDTOMapper;
import com.zenith.api.entity.Conversation;
import com.zenith.api.entity.Post;
import com.zenith.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostImplService implements PostService {
    private final PostRepository postRepository;

    @Override
    public List<PostDTO> getByLastCreateAt() {
        return postRepository.getByLastCreateAt();
    }

    @Override
    public PostDTO createPost(Post post) {
        post.setCreateAt(new Date());
        post.setLastModified(new Date());

        Post createdPost = this.postRepository.save(post);

        return new SavedPostDTOMapper().apply(createdPost);
    }
}