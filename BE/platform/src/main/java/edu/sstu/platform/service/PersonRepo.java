package edu.sstu.platform.service;

import edu.sstu.platform.model.Person;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface PersonRepo extends JpaRepository<Person, UUID>, QuerydslPredicateExecutor<Person> {

  @Query("select p from Person p where p.id in (?1)")
  Set<Person> findAllByIds(Iterable<UUID> ids);

  @Query("select p from Person p"
      + " join fetch p.starredMovieRelations starredMovies"
      + " join fetch p.directedMovieRelations directedMovies"
      + " join fetch starredMovies.movie starredMovie"
      + " join fetch directedMovies.movie directedMovie"
      + " join fetch starredMovie.genres"
      + " join fetch directedMovie.genres"
      + " join fetch starredMovie.directorRelations starredMovieDirectorRel"
      + " join fetch directedMovie.directorRelations directedMovieDirectorRel"
      + " join fetch starredMovieDirectorRel.person"
      + " join fetch directedMovieDirectorRel.person"
      + " where p.id = ?1")
  Optional<Person> findPersonById(UUID id);
}
