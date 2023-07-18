package com.zenith.api.dto.mapper;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.entity.Post;

import java.util.function.Function;

public class GetPostWithoutConversation implements Function<Post, PostDTO> {
    @Override
    public PostDTO apply(Post post) {
        return new PostDTO(
                post.id(),
                post.message(),
                post.createAt(),
                post.lastModified()
        );
    }
}