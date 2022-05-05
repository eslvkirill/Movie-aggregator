package edu.sstu.platform.service;

import static edu.sstu.platform.util.QuerydslUtils.toDotPath;

import edu.sstu.platform.dto.request.PersonRequestDto;
import edu.sstu.platform.dto.response.PersonInfoResponseDto;
import edu.sstu.platform.mapper.PersonMapper;
import edu.sstu.platform.model.QPerson;
import edu.sstu.platform.validator.PersonValidator;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonService {

  private final PersonRepo personRepo;
  private final PersonMapper personMapper;
  private final PersonValidator personValidator;
  private final QPerson qPerson = QPerson.person;

  public UUID createPerson(PersonRequestDto personRequestDto) {
    personValidator.validate(personRequestDto);

    var person = personMapper.toEntity(personRequestDto);

    return personRepo.save(person).getId();
  }

  public void updatePerson(UUID id, PersonRequestDto personRequestDto) {
    personValidator.validate(personRequestDto, id);

    var person = personRepo.findById(id)
        .orElseThrow(() -> entityNotFoundException(id));

    personMapper.update(personRequestDto, person);
  }

  private EntityNotFoundException entityNotFoundException(UUID id) {
    return new EntityNotFoundException("Person by id: " + id + " doesn't exist");
  }

  public void deletePerson(UUID id) {
    var person = personRepo.findById(id)
        .orElseThrow(() -> entityNotFoundException(id));

    personRepo.delete(person);
  }

  @Transactional(readOnly = true)
  public PersonInfoResponseDto findPerson(UUID id) {
    var paths = toDotPath(qPerson.starredMovieRelations, qPerson.directedMovieRelations,
        qPerson.starredMovieRelations.any().movie, qPerson.directedMovieRelations.any().movie);
    var person = personRepo.findBy(qPerson.id.eq(id), ffq -> ffq.project(paths)
        .stream()
        .findFirst()
        .orElseThrow(() -> entityNotFoundException(id)));

    return personMapper.toInfoDto(person);
  }
}
