package com.zenith.api.dto;

import com.zenith.api.entity.Conversation;

import java.util.List;

public record MemberDTO (
        Integer id,
        String firstName,
        String lastName,
        String email,
        List<Conversation> conversations
) { }