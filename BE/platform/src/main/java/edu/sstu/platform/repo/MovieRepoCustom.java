package edu.sstu.platform.repo;

import edu.sstu.platform.dto.request.MoviePageableRequestDto;
import edu.sstu.platform.model.Movie;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;

public interface MovieRepoCustom {

  Page<UUID> findAllIds(Specification<Movie> specification, MoviePageableRequestDto pageableRequest);
}
