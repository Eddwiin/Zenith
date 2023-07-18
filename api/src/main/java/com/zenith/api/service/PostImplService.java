package com.zenith.api.service;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostImplService implements PostService {
    private final PostRepository postRepository;
    @Override
    public PostDTO getLastPostAdded() {
        return null;
    }
}