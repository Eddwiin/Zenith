package com.zenith.api.service;

import com.zenith.api.entity.Member;

public interface MemberService {
    void saveMember(Member member);

    Member findMemberByEmail(String email);
}