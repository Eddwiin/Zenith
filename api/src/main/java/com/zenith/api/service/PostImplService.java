package com.zenith.api.service;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostImplService implements PostService {
    private final PostRepository postRepository;
    @Override
    public List<PostDTO> getByLastCreateAt() {
        return postRepository.getByLastCreateAt();
    }
}