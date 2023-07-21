package com.zenith.api.service;

import com.zenith.api.dto.PostDTO;

import java.util.List;

public interface PostService {
    List<PostDTO> getByLastCreateAt();
}