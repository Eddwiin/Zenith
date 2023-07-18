package com.zenith.api.controller;

import com.zenith.api.entity.Post;
import com.zenith.api.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    public ResponseEntity<Post> getLastPostAdded() {
        return null;
    }
}