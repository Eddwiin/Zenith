package com.zenith.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "member")
public class Member{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_conversation_id")
    private Conversation conversations;
}
