package edu.sstu.platform.service;

import edu.sstu.platform.dto.request.GenreRequestDto;
import edu.sstu.platform.dto.response.GenreResponseDto;
import edu.sstu.platform.mapper.GenreMapper;
import edu.sstu.platform.repo.GenreRepo;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GenreService {

  private final GenreMapper genreMapper;
  private final GenreRepo genreRepo;

  public List<GenreResponseDto> findGenres() {
    return genreMapper.toDto(genreRepo.findAll());
  }

  public UUID createGenre(GenreRequestDto genreRequestDto) {
    return genreRepo.save(genreMapper.toEntity(genreRequestDto)).getId();
  }

  public void updateGenre(UUID id, GenreRequestDto genreRequestDto) {
    genreRepo.save(genreMapper.toEntity(genreRequestDto, id));
  }

  public void deleteGenreById(UUID id) {
    genreRepo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Genre by id: " + id + " doesn't exists"));

    genreRepo.deleteById(id);
  }
}
