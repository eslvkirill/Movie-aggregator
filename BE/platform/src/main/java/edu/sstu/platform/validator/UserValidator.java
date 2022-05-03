package edu.sstu.platform.validator;

import static edu.sstu.platform.util.ExceptionUtils.addErrorMessageByField;

import edu.sstu.platform.config.properties.ValidationProperties;
import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.exception.ValidationException;
import edu.sstu.platform.model.QUser;
import edu.sstu.platform.repo.UserRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;

@Component
@RequiredArgsConstructor
public class UserValidator {

  private final UserRepo userRepo;
  private final ValidationProperties validationProperties;
  private final QUser qUser = QUser.user;

  public void validate(UserRequestDto userRequestDto, UUID id) {
    var messagesByField = new LinkedMultiValueMap<String, String>();
    var emailPredicate = qUser.email.equalsIgnoreCase(userRequestDto.getEmail());
    var usernamePredicate = qUser.username.equalsIgnoreCase(userRequestDto.getUsername());

    if (id != null) {
      emailPredicate = emailPredicate.and(qUser.id.ne(id));
      usernamePredicate = usernamePredicate.and(qUser.id.ne(id));
    }

    if (userRepo.exists(emailPredicate)) {
      addErrorMessageByField(messagesByField, qUser.email, validationProperties::getDuplicateMessage);
    }
    if (userRepo.exists(usernamePredicate)) {
      addErrorMessageByField(messagesByField, qUser.username, validationProperties::getDuplicateMessage);
    }
    if (!messagesByField.isEmpty()) {
      throw new ValidationException(messagesByField);
    }
  }

  public void validate(UserRequestDto userRequestDto) {
    validate(userRequestDto, null);
  }
}
