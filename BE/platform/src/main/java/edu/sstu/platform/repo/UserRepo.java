package edu.sstu.platform.repo;

import edu.sstu.platform.model.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserRepo extends JpaRepository<User, UUID>, QuerydslPredicateExecutor<User> {

}
