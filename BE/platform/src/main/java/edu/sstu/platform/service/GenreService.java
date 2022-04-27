package edu.sstu.platform.service;

import edu.sstu.platform.dto.request.GenreRequestDto;
import edu.sstu.platform.dto.response.GenreResponseDto;
import edu.sstu.platform.mapper.GenreMapper;
import edu.sstu.platform.repo.GenreRepo;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GenreService {

  private final GenreMapper genreMapper;
  private final GenreRepo genreRepo;

  @Transactional(readOnly = true)
  public List<GenreResponseDto> findGenres() {
    return genreMapper.toDto(genreRepo.findAll(Sort.by("creationDate")));
  }

  public UUID createGenre(GenreRequestDto genreRequestDto) {
    return genreRepo.save(genreMapper.toEntity(genreRequestDto)).getId();
  }

  public void updateGenre(UUID id, GenreRequestDto genreRequestDto) {
    genreRepo.save(genreMapper.toEntity(genreRequestDto, id));
  }

  public void deleteGenreById(UUID id) {
    genreRepo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Genre by id: " + id + " doesn't exist"));

    genreRepo.deleteById(id);
  }
}
