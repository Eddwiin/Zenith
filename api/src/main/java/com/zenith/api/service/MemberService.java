package com.zenith.api.service;

import com.zenith.api.dto.MemberDTO;
import com.zenith.api.entity.Member;
import com.zenith.api.exception.SaveMemberArgsIncorrectException;
import com.zenith.api.exception.email.EmailEmptyException;
import com.zenith.api.exception.email.EmailExistException;

public interface MemberService {
    MemberDTO saveMember(Member member) throws EmailExistException, SaveMemberArgsIncorrectException;

    MemberDTO findMemberByEmail(String email) throws EmailEmptyException;
}