package edu.sstu.platform.validator;

import static edu.sstu.platform.util.QuerydslUtils.preparePath;

import edu.sstu.platform.config.properties.ValidationProperties;
import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.exception.ValidationException;
import edu.sstu.platform.model.QUser;
import edu.sstu.platform.repo.UserRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class UserValidator {

  private final UserRepo userRepo;
  private final ValidationProperties validationProperties;
  private final QUser qUser = QUser.user;

  public void validate(UserRequestDto userRequestDto, UUID id) {
    MultiValueMap<String, String> messagesByField = new LinkedMultiValueMap<>();
    var emailPredicate = qUser.email.equalsIgnoreCase(userRequestDto.getEmail());
    var usernamePredicate = qUser.username.equalsIgnoreCase(userRequestDto.getUsername());

    if (id != null) {
      emailPredicate = emailPredicate.and(qUser.id.ne(id));
      usernamePredicate = usernamePredicate.and(qUser.id.ne(id));
    }

    if (userRepo.exists(emailPredicate)) {
      var fieldName = preparePath(qUser.email);
      messagesByField.add(fieldName, validationProperties.getNonUniqueMessage(fieldName));
    }
    if (userRepo.exists(usernamePredicate)) {
      var fieldName = preparePath(qUser.username);
      messagesByField.add(fieldName, validationProperties.getNonUniqueMessage(fieldName));
    }
    if (!messagesByField.isEmpty()) {
      throw new ValidationException(messagesByField);
    }
  }

  public void validate(UserRequestDto userRequestDto) {
    validate(userRequestDto, null);
  }
}
