package edu.sstu.platform.service;

import edu.sstu.platform.model.Person;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface PersonRepo extends JpaRepository<Person, UUID>, QuerydslPredicateExecutor<Person> {

  @Query("select p from Person p where p.id in (?1)")
  Set<Person> findAllByIds(Iterable<UUID> ids);
}
