package edu.sstu.platform.repo;

import edu.sstu.platform.model.Movie;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface MovieRepo extends JpaRepository<Movie, UUID>, QuerydslPredicateExecutor<Movie> {

  @Query("select m from Movie m"
      + " join fetch m.originCountries"
      + " join fetch m.audioLanguages"
      + " join fetch m.subtitleLanguages"
      + " join fetch m.genres"
      + " join fetch m.externalAggregatorInfos"
      + " where m.id = ?1")
  Optional<Movie> findMovieById(UUID id);

  @Query(value = "select m.id from Movie m")
  Page<UUID> findMovieIds(Pageable pageable);

  @Query("select m from Movie m"
      + " join fetch m.genres"
      + " where m.id in (?1)")
  List<Movie> findByIdIn(List<UUID> ids, Sort sort);

  @Modifying
  @Query(value = "update movies set active = not active where id = ?1", nativeQuery = true)
  Integer updateActivityById(UUID id);
}
