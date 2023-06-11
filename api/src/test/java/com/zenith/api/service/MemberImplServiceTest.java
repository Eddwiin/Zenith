package com.zenith.api.service;

import com.zenith.api.entity.Member;
import com.zenith.api.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class MemberImplServiceTest {
    @Mock private MemberRepository memberRepositoryTest;
    private MemberService memberServiceTest;

    @BeforeEach
    void setUp() {
        memberServiceTest = new MemberImplService(memberRepositoryTest);
    }

    @Test
    @Disabled
    void saveMember() {
        Member member = new Member("John", "Doe", "john.doe@test.fr", "azerty123", null);
        memberServiceTest.saveMember(member);

        ArgumentCaptor<Member> memberArgumentCaptor = ArgumentCaptor.forClass(Member.class);
        verify(memberRepositoryTest).save(memberArgumentCaptor.capture());

        Member capturedMember = memberArgumentCaptor.getValue();
        assertThat(capturedMember).isEqualTo(member);
    }

    @Test
    void itShouldCallFindByEmailFromMemberRepository() {
        String email = "mock@test.fr";
        memberServiceTest.findMemberByEmail(email);

        verify(memberRepositoryTest).findByEmail(email);
    }

    @Test
    @Disabled
    void itShouldReturnFalseWhenEmailIsNotFound() {
        Member member = new Member("John", "Doe", "john.doe@test.fr", "azerty123", null);

        given(memberRepositoryTest.findByEmail(member.email())).willReturn(new Member());

        assertThatThrownBy(() -> memberServiceTest.saveMember(member))
//                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Email " + member.email() + " taken");

        verify(memberRepositoryTest, never()).save(any());
    }

    @Test
    @Disabled
    void willThrowWhenEmailIsTaken() {

    }

}