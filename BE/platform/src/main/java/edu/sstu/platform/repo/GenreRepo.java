package edu.sstu.platform.repo;

import edu.sstu.platform.model.Genre;
import java.util.Set;
import java.util.UUID;
import org.mapstruct.Named;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GenreRepo extends JpaRepository<Genre, UUID> {

  @Query("select g from Genre g where g.id in ?1")
  Set<Genre> findAllByIds(Iterable<UUID> ids);
}
