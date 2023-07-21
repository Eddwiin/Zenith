package com.zenith.api.dto;

//public record PostDTO (
//        Integer id,
//        String message,
//        Date createAt,
//        Date lastModified
//) {
//    public PostDTO(Integer id, String message, Date createAt, Date lastModified) {
//        this(id, message, createAt, lastModified);
//    }
//}

import com.zenith.api.entity.Conversation;

import java.util.Date;

public record PostDTO (
        Integer id,
        String message,
        Date createAt,
        Date lastModified,
        Conversation conversation
) {
  public PostDTO(Integer id, String message, Date createAt, Date lastModified) {
      this(id,message,createAt,lastModified,null);
  }

}