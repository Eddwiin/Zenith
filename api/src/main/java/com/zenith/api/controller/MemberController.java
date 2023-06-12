package com.zenith.api.controller;

import com.zenith.api.entity.Member;
import com.zenith.api.exception.SaveMemberArgsIncorrectException;
import com.zenith.api.exception.email.EmailExistException;
import com.zenith.api.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/hello")
    public String hello() {
        return "hello api";
    }

    @PostMapping
    public ResponseEntity<String> saveMember(@RequestBody Member member) throws EmailExistException, SaveMemberArgsIncorrectException {
        memberService.saveMember(member);
        return ResponseEntity.ok("Membre enregistré !");
    }
}