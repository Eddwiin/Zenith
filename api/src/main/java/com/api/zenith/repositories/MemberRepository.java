package com.api.zenith.repositories;

import com.api.zenith.entities.Member;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Integer> {
}
