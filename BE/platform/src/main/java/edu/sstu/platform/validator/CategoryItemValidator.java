package edu.sstu.platform.validator;

import static edu.sstu.platform.util.ExceptionUtils.ofSingleMessage;

import edu.sstu.platform.config.properties.ValidationProperties;
import edu.sstu.platform.exception.ValidationException;
import edu.sstu.platform.model.QCategoryItem;
import edu.sstu.platform.repo.CategoryItemRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryItemValidator {

  private final CategoryItemRepo categoryItemRepo;
  private final ValidationProperties validationProperties;
  private final QCategoryItem qCategoryItem = QCategoryItem.categoryItem;

  public void validate(UUID movieId) {
    if (categoryItemRepo.exists(qCategoryItem.movieId.eq(movieId))) {
      throw new ValidationException(ofSingleMessage(qCategoryItem.movieId, validationProperties::getDuplicateMessage));
    }
  }
}
