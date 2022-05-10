package edu.sstu.platform.validator;

import static edu.sstu.platform.util.ExceptionUtils.ofSingleMessage;

import edu.sstu.platform.config.properties.ValidationProperties;
import edu.sstu.platform.dto.request.CreateRatingRequestDto;
import edu.sstu.platform.exception.ValidationException;
import edu.sstu.platform.model.QRating;
import edu.sstu.platform.repo.RatingRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RatingValidator {

  private final RatingRepo ratingRepo;
  private final ValidationProperties validationProperties;
  private final QRating qRating = QRating.rating;

  public void validate(CreateRatingRequestDto ratingRequestDto, UUID movieId, UUID userId) {
    var predicate = qRating.movieId.eq(movieId)
        .and(qRating.userId.eq(userId))
        .and(qRating.ratingType.eq(ratingRequestDto.getRatingType()));

    if (ratingRepo.exists(predicate)) {
      throw new ValidationException(ofSingleMessage(qRating, validationProperties::getDuplicateMessage));
    }
  }
}
