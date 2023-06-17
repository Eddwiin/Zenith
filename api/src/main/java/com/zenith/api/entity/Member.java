package com.zenith.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "id")
        Integer id;

        @NonNull
        @Size(min = 2)
        @Column(name = "first_name")
        String firstName;

        @NonNull
        @Size(min = 2)
        @Column(name = "last_name")
        String lastName;

        @NonNull
        @Column(name = "email")
        String email;

        @NonNull
        @Column(name = "password")
        String password;

        @NonNull
        @ManyToMany
        @JoinTable(
                name = "member_conversations",
                joinColumns = @JoinColumn(name = "member_id"),
                inverseJoinColumns = @JoinColumn(name = "conversation_id")
        )
        List<Conversation> conversations;

        public Member(String firstName, String lastName, String email, String password) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.email = email;
                this.password = password;
                this.conversations = new ArrayList<>();
        }
}
//@Entity
//@Table(name = "member")
//public record Member(
//        @Id
//        @GeneratedValue(strategy = GenerationType.AUTO)
//        @Column(name = "id")
//        Integer id,
//
//        @NonNull
//        @Size(min = 2)
//        @Column(name = "first_name")
//        String firstName,
//
//        @NonNull
//        @Size(min = 2)
//        @Column(name = "last_name")
//        String lastName,
//
//        @NonNull
//        @Column(name = "email")
//        String email,
//
//        @NonNull
//        @Column(name = "password")
//        String password,
//
//        @NonNull
//        @ManyToMany
//        @JoinTable(
//                name = "member_conversations",
//                joinColumns = @JoinColumn(name = "member_id"),
//                inverseJoinColumns = @JoinColumn(name = "conversation_id")
//        )
//        List<Conversation> conversations
//) {
//    public Member() {
//        this(null, "", "", "", "", new ArrayList<>());
//    }
//    public Member(String firstName, String lastName, String email, String password, List<Conversation> conversation) {
//        this( null, firstName,lastName, email, password, conversation);
//    }
//}