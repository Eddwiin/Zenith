package com.zenith.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "conversation")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "conversation_post_id")
    private Post post;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "conversation_messages_id")
    private Message messages;
}
