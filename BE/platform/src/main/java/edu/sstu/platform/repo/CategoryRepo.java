package edu.sstu.platform.repo;

import edu.sstu.platform.model.Category;
import edu.sstu.platform.model.projection.CategoryToMovieRelationMapping;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface CategoryRepo extends JpaRepository<Category, UUID>, QuerydslPredicateExecutor<Category> {

  @Query(value = "select c.id categoryId, c.name categoryName,"
      + "   coalesce(bool_or(ci.movie_id = ?1), false) contains"
      + " from categories c"
      + " left join category_items ci on c.id = ci.category_id"
      + " where c.user_id = ?2"
      + " group by c.id"
      + " order by c.custom, c.creation_date desc, c.name", nativeQuery = true)
  List<CategoryToMovieRelationMapping> findCategoryToMovieRelationMappings(UUID movieId, UUID userId);
}
