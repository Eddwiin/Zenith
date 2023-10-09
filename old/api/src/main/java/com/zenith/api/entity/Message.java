package com.zenith.api.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "message")
public record Message (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    Integer id,

    @Column(name = "message")
    String message,

    @Column(name = "date")
    Date date,

    @Column(name = "last_modified")
    Date lastModified,

    @ManyToOne
    @JoinColumn(name="conversation_id", nullable = false)
    Conversation conversation
) { }