package com.zenith.api.dto.mapper;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.entity.Post;

import java.util.function.Function;

public class GetPostWithoutConversationDTOMapper implements Function<Post, PostDTO> {
    @Override
    public PostDTO apply(Post post) {
        return new PostDTO(
                post.getId(),
                post.getMessage(),
                post.getCreateAt(),
                post.getLastModified()
        );
    }
}