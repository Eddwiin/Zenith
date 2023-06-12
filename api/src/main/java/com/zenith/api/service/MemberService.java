package com.zenith.api.service;

import com.zenith.api.entity.Member;
import com.zenith.api.exception.SaveMemberArgsIncorrectException;
import com.zenith.api.exception.email.EmailEmptyException;
import com.zenith.api.exception.email.EmailExistException;

import java.util.Optional;

public interface MemberService {
    Member saveMember(Member member) throws EmailExistException, SaveMemberArgsIncorrectException;

    Optional<Member> findMemberByEmail(String email) throws EmailEmptyException;
}