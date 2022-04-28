package edu.sstu.platform.repo;

import edu.sstu.platform.model.Review;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ReviewRepo extends JpaRepository<Review, UUID>, QuerydslPredicateExecutor<Review> {
}
