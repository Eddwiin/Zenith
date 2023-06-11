package com.zenith.api.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "conversation")
public record Conversation(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        Integer id,

        @Column(name = "create_at")
        Date createAt,

        @Column(name = "last_modified")
        Date lastModified,

        @ManyToMany(mappedBy = "conversations")
        List<Member> members,

        @OneToMany(mappedBy = "conversation")
        List<Message> messages,

        @OneToOne(cascade = CascadeType.ALL)
        @PrimaryKeyJoinColumn
        Post post
) {}