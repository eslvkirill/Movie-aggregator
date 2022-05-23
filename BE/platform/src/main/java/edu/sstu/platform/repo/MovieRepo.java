package edu.sstu.platform.repo;

import edu.sstu.platform.model.Movie;
import edu.sstu.platform.model.projection.MovieSearchResultMapping;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface MovieRepo extends JpaRepository<Movie, UUID>, QuerydslPredicateExecutor<Movie>,
    MovieRepoCustom {

  // TODO: remove left joins
  @Query("select m from Movie m"
      + " join fetch m.originCountries"
      + " join fetch m.audioLanguages"
      + " join fetch m.subtitleLanguages"
      + " join fetch m.genres"
      + " join fetch m.externalAggregatorInfos"
      + " left join fetch m.actorRelations actorRel"
      + " left join fetch actorRel.person actor"
      + " left join fetch m.directorRelations directorRel"
      + " left join fetch directorRel.person director"
      + " where m.id = ?1")
  Optional<Movie> findMovieById(UUID id);

  @Query("select distinct m from Movie m"
      + " join fetch m.genres"
      + " join fetch m.directorRelations directorRel"
      + " join fetch directorRel.person"
      + " where m.id in (?1)")
  List<Movie> findByIdIn(List<UUID> ids);

  @Modifying
  @Query(value = "update movies set active = not active where id = ?1", nativeQuery = true)
  Integer updateActivityById(UUID id);

  @Query("select m.id as id, m.engTitle as engTitle, m.rusTitle as rusTitle,"
      + "   m.year as year, m.poster as poster, coalesce(avg(r.score), 0) as totalRating"
      + " from Movie m"
      + " left join m.ratings r"
      + " where m.id in (?1)"
      + " group by m.id")
  List<MovieSearchResultMapping> findSearchResultMappingsByIdIn(List<UUID> ids);
}
