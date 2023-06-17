package com.zenith.api.dto;

import com.zenith.api.entity.Conversation;

import java.util.List;

public record MemberDTO (
        Integer id,
        String firstName,
        String lastName,
        String email,
        String password,
        List<Conversation> conversations
) {
    public MemberDTO(Integer id, String firstName, String lastName, String email, List<Conversation> conversations) {
        this(id, firstName, lastName,email,null,conversations);
    }

    public MemberDTO(String firstName, String lastName, String email, String password, List<Conversation> conversations) {
        this(null, firstName, lastName,email,password,conversations);
    }
}