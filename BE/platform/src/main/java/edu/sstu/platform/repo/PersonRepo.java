package edu.sstu.platform.repo;

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
      + " left join fetch p.starredMovieRelations starredMovies"
      + " left join fetch p.directedMovieRelations directedMovies"
      + " left join fetch starredMovies.movie starredMovie"
      + " left join fetch directedMovies.movie directedMovie"
      + " left join fetch starredMovie.genres"
      + " left join fetch directedMovie.genres"
      + " left join fetch starredMovie.directorRelations starredMovieDirectorRel"
      + " left join fetch directedMovie.directorRelations directedMovieDirectorRel"
      + " left join fetch starredMovieDirectorRel.person"
      + " left join fetch directedMovieDirectorRel.person"
      + " where p.id = ?1")
  Optional<Person> findPersonById(UUID id);
}
