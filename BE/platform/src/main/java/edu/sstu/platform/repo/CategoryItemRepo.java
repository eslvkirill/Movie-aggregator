package edu.sstu.platform.repo;

import edu.sstu.platform.model.CategoryItem;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface CategoryItemRepo extends JpaRepository<CategoryItem, UUID>,
    QuerydslPredicateExecutor<CategoryItem> {

  @Query("select ci from CategoryItem ci"
      + " join fetch ci.movie m"
      + " join fetch m.genres"
      + " join fetch m.directorRelations directorRel"
      + " join fetch directorRel.person"
      + " where ci.categoryId = ?1"
      + " order by ci.creationDate desc")
  List<CategoryItem> findByCategoryId(UUID categoryId);
}
