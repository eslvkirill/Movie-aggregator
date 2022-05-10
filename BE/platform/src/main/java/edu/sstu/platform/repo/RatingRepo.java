package edu.sstu.platform.repo;

import edu.sstu.platform.model.Rating;
import edu.sstu.platform.model.RatingType;
import edu.sstu.platform.model.projection.RatingMapping;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface RatingRepo extends JpaRepository<Rating, UUID>, QuerydslPredicateExecutor<Rating> {

  @Query("select r.movieId as movieId, r.ratingType as ratingType, avg(r.score) as averageScore"
      + " from Rating r"
      + " where r.movieId in (?1) and r.ratingType in (?2)"
      + " group by r.movieId, r.ratingType, r.rank"
      + " order by r.rank")
  List<RatingMapping> findByMovieIdsAndRatingTypes(List<UUID> movieIds, List<RatingType> ratingTypes);
}
