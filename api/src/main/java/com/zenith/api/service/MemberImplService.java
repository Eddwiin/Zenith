package com.zenith.api.service;

import com.zenith.api.entity.Member;
import com.zenith.api.exception.email.EmailIsEmptyException;
import com.zenith.api.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberImplService implements MemberService {
    private final MemberRepository memberRepository;

    public MemberImplService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Member findMemberByEmail(String email) throws EmailIsEmptyException {

        if(email == null || email.isEmpty()) {
            throw new EmailIsEmptyException("Email is empty");
        }
        return memberRepository.findByEmail(email);
    }
}