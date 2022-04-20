package edu.sstu.platform.repo;

import edu.sstu.platform.model.Genre;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepo extends JpaRepository<Genre, UUID> {

}
