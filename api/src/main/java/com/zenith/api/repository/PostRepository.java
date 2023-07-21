package com.zenith.api.repository;

import com.zenith.api.dto.PostDTO;
import com.zenith.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("SELECT p FROM Post p ORDER BY p.createAt DESC")
    List<PostDTO> getByLastCreateAt();
}