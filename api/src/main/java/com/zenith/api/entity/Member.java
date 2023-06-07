package com.zenith.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name="member")
public class Member{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
}
