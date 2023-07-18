package com.zenith.api.service;

import com.zenith.api.dto.PostDTO;

public interface PostService {
    PostDTO getLastPostAdded();
}