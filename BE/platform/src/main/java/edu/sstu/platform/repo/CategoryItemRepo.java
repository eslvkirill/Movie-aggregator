package edu.sstu.platform.repo;

import edu.sstu.platform.model.CategoryItem;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface CategoryItemRepo extends JpaRepository<CategoryItem, UUID>,
    QuerydslPredicateExecutor<CategoryItem> {

}
