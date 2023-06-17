package com.zenith.api.service;

import com.zenith.api.dto.MemberDTO;
import com.zenith.api.dto.mapper.FoundMemberDTOMapper;
import com.zenith.api.dto.mapper.SavedMemberDTOMapper;
import com.zenith.api.entity.Member;
import com.zenith.api.exception.SaveMemberArgsIncorrectException;
import com.zenith.api.exception.email.EmailEmptyException;
import com.zenith.api.exception.email.EmailExistException;
import com.zenith.api.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberImplService implements MemberService {
    private final MemberRepository memberRepository;

    public MemberImplService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public MemberDTO saveMember(Member member) throws EmailExistException, SaveMemberArgsIncorrectException {
        Optional<Member> isMemberExist = memberRepository.findByEmail(member.getEmail());

        if(isMemberExist.isPresent()) {
            throw new EmailExistException("Email is taken : " + member.getEmail());
        }

        Member memberSaved = memberRepository.save(member);
        return new SavedMemberDTOMapper().apply(memberSaved);
    }

    @Override
    public MemberDTO findMemberByEmail(String email) throws EmailEmptyException {

        if(email == null || email.isEmpty()) {
            throw new EmailEmptyException("Email is empty");
        }

        Optional<Member> memberFound = memberRepository.findByEmail(email);

        return memberFound.isPresent()  ? new FoundMemberDTOMapper().apply(memberFound.get()) : null;
    }
}