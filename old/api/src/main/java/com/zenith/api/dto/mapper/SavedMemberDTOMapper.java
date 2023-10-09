package com.zenith.api.dto.mapper;

import com.zenith.api.dto.MemberDTO;
import com.zenith.api.entity.Member;

import java.util.function.Function;

public class SavedMemberDTOMapper implements Function<Member, MemberDTO> {
    @Override
    public MemberDTO apply(Member member) {
        return new MemberDTO(
                member.getId(),
                member.getFirstName(),
                member.getLastName(),
                member.getEmail(),
                member.getConversations()
        );
    }
}