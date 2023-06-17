package com.zenith.api.service;

import com.zenith.api.entity.Member;
import com.zenith.api.exception.email.EmailEmptyException;
import com.zenith.api.exception.email.EmailExistException;
import com.zenith.api.repository.MemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class MemberImplServiceTest {
    @Mock private MemberRepository memberRepositoryTest;

    private MemberService memberServiceTest;
    private Member member;

    @BeforeEach
    void setUp() {
        memberServiceTest = new MemberImplService(memberRepositoryTest);
        member = new Member("John", "Doe", "john.doe@test.fr", "azerty123");
    }

    @AfterEach
    void tearDown() {
        memberRepositoryTest.deleteAll();
    }

    @Test
    void itShouldCallFindByEmailFromMemberRepository() throws EmailEmptyException {
        String email = "mock@test.fr";
        memberServiceTest.findMemberByEmail(email);

        verify(memberRepositoryTest).findByEmail(email);
    }

    @Test
    void willThrowWhenEmailIsNull() {
        assertThatThrownBy(() -> memberServiceTest.findMemberByEmail(null))
                .isInstanceOf(EmailEmptyException.class)
                .hasMessageContaining("Email is empty");
        verify(memberRepositoryTest, never()).findByEmail(null);
    }

    @Test
    void itShouldThrowWhenEmailIsEmpty() {
        assertThatThrownBy(() -> memberServiceTest.findMemberByEmail(""))
                .isInstanceOf(EmailEmptyException.class)
                .hasMessageContaining("Email is empty");
        verify(memberRepositoryTest, never()).findByEmail("");
    }

    @Test
    void itShouldSaveMember() throws EmailExistException{
        memberServiceTest.saveMember(member);

        ArgumentCaptor<Member> memberArgumentCaptor = ArgumentCaptor.forClass(Member.class);
        verify(memberRepositoryTest).save(memberArgumentCaptor.capture());

        Member capturedMember = memberArgumentCaptor.getValue();
        assertThat(capturedMember).isEqualTo(member);

    }

    @Test
    void itShouldThrowWhenUserExistOnSave() {
        given(memberRepositoryTest.findByEmail(anyString())).willReturn(Optional.of(new Member()));

        assertThatThrownBy(() ->  memberServiceTest.saveMember(member))
                .isInstanceOf(EmailExistException.class)
                .hasMessageContaining(("Email is taken : " + member.getEmail()));

        verify(memberRepositoryTest, never()).save(any());
    }

    @Test
    void itShouldThrowWhenArgsOfSaveMemberIsIncorrect() {
        given(memberRepositoryTest.findByEmail(anyString())).willReturn(Optional.empty());

//        assertThatThrownBy(() -> memberServiceTest.saveMember(member))
//                .isInstanceOf(SaveMemberArgsIncorrectException.class)
//                .hasMessageContaining("Args is incorrect");

        verify(memberRepositoryTest,never()).save(any());
    }

}