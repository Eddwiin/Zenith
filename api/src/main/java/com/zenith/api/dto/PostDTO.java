package com.zenith.api.dto;

import java.util.Date;

public record PostDTO (
        Integer id,
        String message,
        Date createAt,
        Date lastModified
) {
}