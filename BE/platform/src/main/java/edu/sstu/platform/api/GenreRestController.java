package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.GenreRequestDto;
import edu.sstu.platform.dto.response.GenreResponseDto;
import edu.sstu.platform.service.GenreService;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/genres")
public class GenreRestController {

  private final GenreService genreService;

  @GetMapping
  public List<GenreResponseDto> getGenres() {
    return genreService.findGenres();
  }

  @PostMapping
  public ResponseEntity<UUID> createGenre(@RequestBody @Valid GenreRequestDto genreRequestDto) {
    var id = genreService.createGenre(genreRequestDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(id);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateGenre(@PathVariable UUID id, @RequestBody @Valid GenreRequestDto genreRequestDto) {
    genreService.updateGenre(id, genreRequestDto);
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteGenre(@PathVariable UUID id) {
    genreService.deleteGenreById(id);
  }
}
