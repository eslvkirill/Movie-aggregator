package edu.sstu.platform.validator;

import static edu.sstu.platform.config.properties.ValidationProperties.FILE_TYPE;
import static edu.sstu.platform.util.ExceptionUtils.addErrorMessageByField;
import static edu.sstu.platform.util.QuerydslUtils.toDotPath;

import edu.sstu.platform.config.properties.ValidationProperties;
import edu.sstu.platform.dto.request.PersonRequestDto;
import edu.sstu.platform.exception.ValidationException;
import edu.sstu.platform.model.QPerson;
import edu.sstu.platform.repo.PersonRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;

@Component
@RequiredArgsConstructor
public class PersonValidator {

  private final PersonRepo personRepo;
  private final ValidationProperties validationProperties;
  private final QPerson qPerson = QPerson.person;

  public void validate(PersonRequestDto personRequestDto, UUID id) {
    var messagesByField = new LinkedMultiValueMap<String, String>();
    var predicate = qPerson.firstName.equalsIgnoreCase(personRequestDto.getFirstName())
        .and(qPerson.lastName.equalsIgnoreCase(personRequestDto.getLastName()));

    if (id != null) {
      predicate = predicate.and(qPerson.id.ne(id));
    }

    if (personRepo.exists(predicate)) {
      addErrorMessageByField(messagesByField, qPerson, validationProperties::getDuplicateMessage);
    }
    if (personRequestDto.getImage().isEmpty()) {
      messagesByField.add(toDotPath(qPerson.image), validationProperties.getEmptyMessage(FILE_TYPE));
    }
    if (!messagesByField.isEmpty()) {
      throw new ValidationException(messagesByField);
    }
  }

  public void validate(PersonRequestDto personRequestDto) {
    validate(personRequestDto, null);
  }
}
