package com.zenith.api.dto;

import com.zenith.api.entity.Member;

import java.util.function.Function;

public class MemberDTOMapper implements Function<Member, MemberDTO> {

    @Override
    public MemberDTO apply(Member member) {
        return new MemberDTO(
                member.id(),
                member.firstName(),
                member.lastName(),
                member.email(),
                member.conversations()
        );
    }
}