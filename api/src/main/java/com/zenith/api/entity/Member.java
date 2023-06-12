package com.zenith.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
public record Member(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        Integer id,

        @NonNull
        @Size(min = 2)
        @Column(name = "first_name")
        String firstName,

        @NonNull
        @Size(min = 2)
        @Column(name = "last_name")
        String lastName,

        @NonNull
        @Column(name = "email")
        String email,

        @NonNull
        @Column(name = "password")
        String password,

        @NonNull
        @ManyToMany
        @JoinTable(
                name = "member_conversations",
                joinColumns = @JoinColumn(name = "member_id"),
                inverseJoinColumns = @JoinColumn(name = "conversation_id")
        )
        List<Conversation> conversations
) {
    public Member() {
        this(null, "", "", "", "", new ArrayList<>());
    }
    public Member(String firstName, String lastName, String email, String password, List<Conversation> conversation) {
        this( null, firstName,lastName, email, password, conversation);
    }
}