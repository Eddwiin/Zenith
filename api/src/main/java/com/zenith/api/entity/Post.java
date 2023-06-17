package com.zenith.api.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "post")
public record Post (
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

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "post")
    Conversation conversation
) { }