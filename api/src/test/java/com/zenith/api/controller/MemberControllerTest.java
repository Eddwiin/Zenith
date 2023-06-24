package com.zenith.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zenith.api.dto.MemberDTO;
import com.zenith.api.dto.mapper.SavedMemberDTOMapper;
import com.zenith.api.entity.Member;
import com.zenith.api.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.MethodArgumentNotValidException;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
class MemberControllerTest {

    @MockBean
    private MemberService memberServiceTest;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void shouldReturnOkForSaveMember() throws Exception {
        Member mockMemberToSave = new Member("John", "Doe", "john.doe@test.fr", "azerty123");
        MemberDTO mockMemberSaved = new SavedMemberDTOMapper().apply(new Member(
                1,
                mockMemberToSave.getFirstName(),
                mockMemberToSave.getLastName(),
                mockMemberToSave.getEmail(),
                mockMemberToSave.getPassword(),
                mockMemberToSave.getConversations()
        ));

        when(memberServiceTest.saveMember(mockMemberToSave)).thenReturn(mockMemberSaved);

        mockMvc.perform(
                post("/member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockMemberToSave)))
                .andExpect(status().isOk());

    }

    @Test
    public void shouldThrowMethodArgumentNotValidExceptionForSaveMember() throws Exception {
        Member mockMemberToSave = new Member();

        mockMvc.perform(
                post("/member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockMemberToSave)))
                .andExpect(status().isBadRequest())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException));

    }
}