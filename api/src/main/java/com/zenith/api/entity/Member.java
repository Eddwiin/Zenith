package com.zenith.api.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "member")
public record Member(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        Integer id,

        @Column(name = "first_name")
        String firstName,

        @Column(name = "last_name")
        String lastName,

        @Column(name = "email")
        String email,

        @Column(name = "password")
        String password,

        @ManyToMany
        @JoinTable(
                name = "member_conversations",
                joinColumns = @JoinColumn(name = "member_id"),
                inverseJoinColumns = @JoinColumn(name = "conversation_id")
        )
        List<Conversation> conversations
) {
    public Member() {
        this(null, null, null, null,null,null);
    }
    public Member(String firstName, String lastName, String email, String password, List<Conversation> conversation) {
        this( null, firstName,lastName, email, password, conversation);
    }
}