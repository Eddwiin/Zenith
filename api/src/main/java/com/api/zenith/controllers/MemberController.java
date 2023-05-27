package com.api.zenith.controllers;

import com.api.zenith.repositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path="/member")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/hello")
    public String hello() {
        return "Hello member";
    }
}
