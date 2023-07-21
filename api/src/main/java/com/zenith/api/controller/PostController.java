package com.zenith.api.controller;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/last-created")
    public ResponseEntity<List<PostDTO>> getLastPostAdded() {
        return ResponseEntity.ok(postService.getByLastCreateAt());
    }
}