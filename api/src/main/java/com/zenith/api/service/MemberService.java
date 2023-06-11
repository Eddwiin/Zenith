package com.zenith.api.service;

import com.zenith.api.entity.Member;
import com.zenith.api.exception.email.EmailIsEmptyException;

public interface MemberService {
    Member saveMember(Member member);

    Member findMemberByEmail(String email) throws EmailIsEmptyException;
}