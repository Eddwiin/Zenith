package com.zenith.api.dto;

import com.zenith.api.entity.Conversation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record MemberDto (
        Integer id,

        @NotEmpty
        @Size(min = 2, message = "First name must be greater than 2 letter")
         String firstName,

        @NotEmpty
        @Size(min = 2, message = "First name must be greater than 2 letter")
        String lastName,

        @NotEmpty(message = "Email should not be empty")
        @Email
        String email,

        @NotEmpty(message = "Password should not be empty")
        String password,

        List<Conversation> conversations
) { }