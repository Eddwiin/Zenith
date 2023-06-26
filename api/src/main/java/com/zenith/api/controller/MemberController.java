package com.zenith.api.controller;

import com.zenith.api.dto.MemberDTO;
import com.zenith.api.entity.Member;
import com.zenith.api.exception.email.EmailExistException;
import com.zenith.api.request.SaveMemberRequest;
import com.zenith.api.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping
    public ResponseEntity<MemberDTO> saveMember(@Valid @RequestBody SaveMemberRequest saveMemberReq) throws EmailExistException {
        Member member = new Member(saveMemberReq.firstName(), saveMemberReq.lastName(), saveMemberReq.email(), saveMemberReq.password());
        MemberDTO memberDTO = memberService.saveMember(member);
        return ResponseEntity.ok(memberDTO);
    }

}