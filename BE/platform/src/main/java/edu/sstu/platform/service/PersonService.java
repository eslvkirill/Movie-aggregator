package edu.sstu.platform.service;

import static edu.sstu.platform.model.RatingType.TOTAL;
import static edu.sstu.platform.util.QuerydslUtils.toDotPath;

import edu.sstu.platform.dto.request.PersonRequestDto;
import edu.sstu.platform.dto.response.PersonInfoResponseDto;
import edu.sstu.platform.dto.response.PersonViewResponseDto;
import edu.sstu.platform.mapper.PersonMapper;
import edu.sstu.platform.model.MoviesToPeopleRelation;
import edu.sstu.platform.model.QPerson;
import edu.sstu.platform.repo.PersonRepo;
import edu.sstu.platform.validator.PersonValidator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonService {

  private final RatingService ratingService;
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
    var person = personRepo.findPersonById(id)
        .orElseThrow(() -> entityNotFoundException(id));
    var personMovieIds = Stream.concat(
            person.getDirectedMovieRelations()
                .stream()
                .map(MoviesToPeopleRelation::getMovieId),
            person.getStarredMovieRelations()
                .stream()
                .map(MoviesToPeopleRelation::getMovieId))
        .collect(Collectors.toList());
    var ratingsByMovieId = ratingService.findRatingsByMovieIds(personMovieIds, TOTAL);

    return personMapper.toInfoDto(person, ratingsByMovieId);
  }

  @Transactional(readOnly = true)
  public List<PersonViewResponseDto> findPeople() {
    var order = toDotPath(qPerson.firstName, qPerson.lastName).toArray(String[]::new);

    return personMapper.toViewDto(personRepo.findAll(Sort.by(order)));
  }
}
