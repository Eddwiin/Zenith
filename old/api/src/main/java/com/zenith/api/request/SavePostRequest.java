package com.zenith.api.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SavePostRequest (
        @NotNull(message = "Message is mandatory")
        @Size(min = 2)
        String message
) {

}
