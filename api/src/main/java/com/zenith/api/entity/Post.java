package com.zenith.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    Integer id;

    @Column(name = "message")
    String message;

    @Column(name = "create_at")
    Date createAt;

    @Column(name = "last_modified")
    Date lastModified;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "post")
    Conversation conversation;

    public Post(String message){
        this.message = message;
    }
}