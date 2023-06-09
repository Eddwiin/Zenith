package com.zenith.api.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "message")
    private String message;
    @Column(name = "date")
    private Date date;

    @Column(name = "last_modified")
    private Date lastModified;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "post")
    private Conversation conversation;

}
