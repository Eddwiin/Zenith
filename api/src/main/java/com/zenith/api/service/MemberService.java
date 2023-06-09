package com.zenith.api.service;

import com.zenith.api.dto.MemberDto;
import com.zenith.api.entity.Member;

public interface MemberService {
    void saveMember(MemberDto memberDto);

    Member findMemberByEmail(String email);
}
