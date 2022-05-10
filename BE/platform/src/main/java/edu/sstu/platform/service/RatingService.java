package edu.sstu.platform.service;

import edu.sstu.platform.dto.request.CreateRatingRequestDto;
import edu.sstu.platform.dto.request.UpdateRatingRequestDto;
import edu.sstu.platform.mapper.RatingMapper;
import edu.sstu.platform.model.RatingType;
import edu.sstu.platform.model.projection.RatingMapping;
import edu.sstu.platform.repo.RatingRepo;
import edu.sstu.platform.validator.RatingValidator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RatingService {

  private final RatingRepo ratingRepo;
  private final RatingMapper ratingMapper;
  private final RatingValidator ratingValidator;

  public UUID createRating(UUID movieId, UUID userId, CreateRatingRequestDto ratingRequestDto) {
    ratingValidator.validate(ratingRequestDto, movieId, userId);

    var rating = ratingMapper.toEntity(ratingRequestDto, movieId, userId);

    return ratingRepo.save(rating).getId();
  }

  public void updateRating(UUID movieId, UUID ratingId, UpdateRatingRequestDto ratingRequestDto) {
    var rating = ratingRepo.findById(ratingId)
        .orElseThrow(() -> entityNotFoundException(movieId));

    ratingMapper.update(ratingRequestDto, rating);
  }

  private EntityNotFoundException entityNotFoundException(UUID movieId) {
    return new EntityNotFoundException("Your rating for movie: " + movieId + "doesn't exist");
  }

  public void deleteRating(UUID movieId, UUID ratingId) {
    var rating = ratingRepo.findById(ratingId)
        .orElseThrow(() -> entityNotFoundException(movieId));

    ratingRepo.delete(rating);
  }

  @Transactional
  public Map<UUID, List<RatingMapping>> findRatingsByMovieIds(List<UUID> movieIds, RatingType... ratingTypes) {
    return ratingRepo.findByMovieIdsAndRatingTypes(movieIds, List.of(ratingTypes))
        .stream()
        .collect(Collectors.groupingBy(RatingMapping::getMovieId));
  }
}
