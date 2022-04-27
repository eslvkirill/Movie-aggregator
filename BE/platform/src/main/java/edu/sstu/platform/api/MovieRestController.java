package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.MovieRequestDto;
import edu.sstu.platform.dto.response.MovieInfoResponseDto;
import edu.sstu.platform.dto.response.MovieViewResponseDto;
import edu.sstu.platform.service.MovieService;
import java.net.URI;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/movies")
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
    movieService.updateMovieActivity(id);
  }

  @GetMapping("/{id}")
  public MovieInfoResponseDto getMovieById(@PathVariable UUID id) {
    return movieService.findMovieById(id);
  }

  @GetMapping
  public Page<MovieViewResponseDto> getMovies(Pageable pageable) {
    return movieService.findMovies(pageable);
  }
}
