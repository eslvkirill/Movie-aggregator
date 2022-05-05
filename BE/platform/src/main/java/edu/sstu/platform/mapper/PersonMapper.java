package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.PersonRequestDto;
import edu.sstu.platform.dto.response.PersonInfoResponseDto;
import edu.sstu.platform.dto.response.PersonResponseDto;
import edu.sstu.platform.dto.response.PersonViewResponseDto;
import edu.sstu.platform.model.MoviesToPeopleRelation;
import edu.sstu.platform.model.Person;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(uses = {FileMapper.class, PersonRolesMapper.class})
public interface PersonMapper {

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "starredMovieRelations", ignore = true),
      @Mapping(target = "directedMovieRelations", ignore = true)
  })
  Person toEntity(PersonRequestDto personRequestDto);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "starredMovieRelations", ignore = true),
      @Mapping(target = "directedMovieRelations", ignore = true)
  })
  void update(PersonRequestDto personRequestDto, @MappingTarget Person person);

  @Mappings({
      @Mapping(target = "name", source = "fullName"),
      @Mapping(target = "roles", source = ".")
  })
  PersonInfoResponseDto toInfoDto(Person person);

  @Mappings({
      @Mapping(target = "name", source = "fullName")
  })
  PersonViewResponseDto toViewDto(Person person);

  default Set<PersonViewResponseDto> toViewDto(Set<MoviesToPeopleRelation> relations) {
    return relations.stream()
        .map(relation -> toViewDto(relation.getPerson()))
        .sorted(Comparator.comparing(PersonResponseDto::getName))
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }
}
