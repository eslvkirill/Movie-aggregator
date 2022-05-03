package edu.sstu.platform.validator;

import static edu.sstu.platform.util.ExceptionUtils.ofSingleMessage;

import com.querydsl.core.types.dsl.BooleanExpression;
import edu.sstu.platform.config.properties.ValidationProperties;
import edu.sstu.platform.dto.request.CategoryRequestDto;
import edu.sstu.platform.exception.ValidationException;
import edu.sstu.platform.model.Category;
import edu.sstu.platform.model.QCategory;
import edu.sstu.platform.repo.CategoryRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryValidator {

  private final CategoryRepo categoryRepo;
  private final ValidationProperties validationProperties;
  private final QCategory qCategory = QCategory.category;

  public void validate(CategoryRequestDto categoryRequestDto, UUID userId) {
    var predicate = getCategoryPredicate(categoryRequestDto, userId);

    if (categoryRepo.exists(predicate)) {
      throw new ValidationException(ofSingleMessage(qCategory, validationProperties::getDuplicateMessage));
    }
  }

  public void validate(CategoryRequestDto categoryRequestDto, Category category) {
    if (!category.isCustom()) {
      throw new ValidationException(ofSingleMessage(qCategory, validationProperties::getNotSupportedOperationMessage));
    }

    var predicate = getCategoryPredicate(categoryRequestDto, category.getUserId())
        .and(qCategory.id.ne(category.getId()));

    if (categoryRepo.exists(predicate)) {
      throw new ValidationException(ofSingleMessage(qCategory, validationProperties::getDuplicateMessage));
    }
  }

  private BooleanExpression getCategoryPredicate(CategoryRequestDto categoryRequestDto, UUID userId) {
    return qCategory.name.equalsIgnoreCase(categoryRequestDto.getName())
        .and(qCategory.userId.eq(userId));
  }
}
