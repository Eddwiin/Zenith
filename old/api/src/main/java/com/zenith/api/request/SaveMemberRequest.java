package com.zenith.api.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SaveMemberRequest(
        @NotBlank(message = "Name is mandatory")
        @Size(min = 2)
        String firstName,

        @NotBlank(message = "Name is mandatory")
        @Size(min = 2)
        String lastName,

        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Password is mandatory")
        String password
) { }