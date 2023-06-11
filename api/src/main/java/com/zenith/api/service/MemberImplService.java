package com.zenith.api.service;

import com.zenith.api.entity.Member;
import com.zenith.api.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberImplService implements MemberService {
    private final MemberRepository memberRepository;

    public MemberImplService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void saveMember(Member member) {
    }

    @Override
    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }
}