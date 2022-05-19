package edu.sstu.platform.repo;

import edu.sstu.platform.model.Review;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ReviewRepo extends JpaRepository<Review, UUID>, QuerydslPredicateExecutor<Review> {

  @Query("select r.id from Review r where r.movieId = ?1")
  Page<UUID> findReviewIdsByMovieId(UUID movieId, Pageable pageable);

  @Query("select r from Review r"
      + " left join fetch r.ratings"
      + " join fetch r.user"
      + " where r.id in (?1)")
  List<Review> findByIdIn(List<UUID> ids, Sort sort);
}
