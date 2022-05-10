package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.PersonRequestDto;
import edu.sstu.platform.dto.response.PersonInfoResponseDto;
import edu.sstu.platform.dto.response.PersonResponseDto;
import edu.sstu.platform.dto.response.PersonViewResponseDto;
import edu.sstu.platform.model.MoviesToPeopleRelation;
import edu.sstu.platform.model.Person;
import edu.sstu.platform.model.projection.RatingMapping;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = {FileMapper.class, PersonRolesMapper.class})
public abstract class PersonMapper {

  @Autowired
  protected PersonRolesMapper personRolesMapper;

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "starredMovieRelations", ignore = true),
      @Mapping(target = "directedMovieRelations", ignore = true)
  })
  public abstract Person toEntity(PersonRequestDto personRequestDto);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "starredMovieRelations", ignore = true),
      @Mapping(target = "directedMovieRelations", ignore = true)
  })
  public abstract void update(PersonRequestDto personRequestDto, @MappingTarget Person person);

  @Mappings({
      @Mapping(target = "name", source = "person.fullName"),
      @Mapping(target = "roles", expression = "java(personRolesMapper.toDto(person, ratingsByMovieId))")
  })
  public abstract PersonInfoResponseDto toInfoDto(Person person, Map<UUID, List<RatingMapping>> ratingsByMovieId);

  @Mappings({
      @Mapping(target = "name", source = "fullName")
  })
  public abstract PersonViewResponseDto toViewDto(Person person);

  public Set<PersonViewResponseDto> toViewDto(Set<MoviesToPeopleRelation> relations) {
    return relations.stream()
        .map(relation -> toViewDto(relation.getPerson()))
        .sorted(Comparator.comparing(PersonResponseDto::getName))
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }

  public abstract List<PersonViewResponseDto> toViewDto(List<Person> people);
}
