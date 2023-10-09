package com.zenith.api.service;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.entity.Post;

import java.util.List;

public interface PostService {
    List<PostDTO> getByLastCreateAt();

    PostDTO createPost(Post post);
}