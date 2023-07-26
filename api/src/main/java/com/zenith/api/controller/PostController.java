package com.zenith.api.controller;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.entity.Post;
import com.zenith.api.request.SavePostRequest;
import com.zenith.api.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<PostDTO> create(@Valid @RequestBody SavePostRequest savePostReq) {
        Post post = new Post(savePostReq.message());
        return ResponseEntity.ok(postService.createPost(post));
    }

    @GetMapping("/last-created")
    public ResponseEntity<List<PostDTO>> getLastPostAdded() {
        return ResponseEntity.ok(postService.getByLastCreateAt());
    }
}