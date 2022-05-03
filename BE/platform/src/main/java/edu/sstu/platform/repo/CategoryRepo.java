package edu.sstu.platform.repo;

import edu.sstu.platform.model.Category;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface CategoryRepo extends JpaRepository<Category, UUID>, QuerydslPredicateExecutor<Category> {

}
