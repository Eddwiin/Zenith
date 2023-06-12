package com.zenith.api.service;

import com.zenith.api.entity.Member;
import com.zenith.api.exception.SaveMemberArgsIncorrectException;
import com.zenith.api.exception.email.EmailEmptyException;
import com.zenith.api.exception.email.EmailExistException;
import com.zenith.api.repository.MemberRepository;
import com.zenith.api.validator.MemberValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

import java.util.Optional;

@Service
public class MemberImplService implements MemberService {
    private final MemberRepository memberRepository;
    @Autowired
    private MemberValidator memberValidator;

    public MemberImplService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public Member saveMember(Member member) throws EmailExistException, SaveMemberArgsIncorrectException {
        Optional<Member> isMemberExist = memberRepository.findByEmail((member.email()));
        if (isMemberExist.isPresent()) {
            throw new EmailExistException("Email is taken : " + member.email());
        }

        Errors errors = new BeanPropertyBindingResult(member, "member");
        ValidationUtils.invokeValidator(memberValidator, member, errors);

        if (errors.hasErrors()) {
            throw new SaveMemberArgsIncorrectException("Args is incorrect");
        }

        return memberRepository.save(member);
    }

    @Override
    public Optional<Member> findMemberByEmail(String email) throws EmailEmptyException {

        if(email == null || email.isEmpty()) {
            throw new EmailEmptyException("Email is empty");
        }
        return memberRepository.findByEmail(email);
    }
}