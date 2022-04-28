package edu.sstu.platform.validator;

import static edu.sstu.platform.config.properties.ValidationProperties.FILE_TYPE;
import static edu.sstu.platform.util.QuerydslUtils.preparePath;

import edu.sstu.platform.config.properties.ValidationProperties;
import edu.sstu.platform.dto.request.MovieRequestDto;
import edu.sstu.platform.exception.ValidationException;
import edu.sstu.platform.model.QMovie;
import edu.sstu.platform.repo.MovieRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class MovieValidator {

  private final MovieRepo movieRepo;
  private final ValidationProperties validationProperties;
  private final QMovie qMovie = QMovie.movie;

  @SneakyThrows
  public void validate(MovieRequestDto movieRequestDto, UUID id) {
    MultiValueMap<String, String> messagesByField = new LinkedMultiValueMap<>();
    var predicate = qMovie.engTitle.equalsIgnoreCase(movieRequestDto.getEngTitle())
        .and(qMovie.year.eq(movieRequestDto.getYear()));

    if (id != null) {
      predicate = predicate.and(qMovie.id.ne(id));
    }

    if (movieRepo.exists(predicate)) {
      messagesByField.add(preparePath(qMovie.engTitle), preparePath(qMovie));
    }
    if (movieRequestDto.getPoster().isEmpty()) {
      messagesByField.add(preparePath(qMovie.poster), validationProperties.getNonEmptyMessage(FILE_TYPE));
    }
    if (movieRequestDto.getBackground().isEmpty()) {
      messagesByField.add(preparePath(qMovie.background), validationProperties.getNonEmptyMessage(FILE_TYPE));
    }
    if (!messagesByField.isEmpty()) {
      throw new ValidationException(messagesByField);
    }
  }

  public void validate(MovieRequestDto movieRequestDto) {
    validate(movieRequestDto, UUID.randomUUID());
  }
}
