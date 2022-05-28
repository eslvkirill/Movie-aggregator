package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.MoviePageableRequestDto;
import edu.sstu.platform.dto.request.MovieRequestDto;
import edu.sstu.platform.dto.request.MovieSpecification;
import edu.sstu.platform.dto.request.MoviePage;
import edu.sstu.platform.dto.response.MovieResponseDto;
import edu.sstu.platform.dto.response.MovieViewResponseDto;
import edu.sstu.platform.service.MovieService;
import java.net.URI;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/movies")
@RequiredArgsConstructor
public class MovieRestController {

  private final MovieService movieService;

  @PostMapping
  public ResponseEntity<Void> createMovie(@Valid MovieRequestDto movieRequestDto) {
    var id = movieService.createMovie(movieRequestDto);

    URI location = ServletUriComponentsBuilder.fromCurrentRequestUri()
        .path("/{id}")
        .buildAndExpand(id)
        .toUri();

    return ResponseEntity.created(location).build();
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateMovie(@PathVariable UUID id, @Valid MovieRequestDto movieRequestDto) {
    movieService.updateMovie(id, movieRequestDto);
  }

  @PostMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteMovie(@PathVariable UUID id) {
    movieService.safeDeleteMovie(id);
  }

  @GetMapping("/{id}")
  public MovieResponseDto getMovieById(@PathVariable UUID id, @RequestParam MoviePage moviePage) {
    return movieService.findMovieById(id, moviePage);
  }

  @GetMapping
  public Page<MovieViewResponseDto> getMovies(MovieSpecification movieSpec, MoviePageableRequestDto pageableRequest) {
    return movieService.findMovies(movieSpec, pageableRequest);
  }
}
