package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.response.MovieViewResponseDto;
import edu.sstu.platform.dto.response.PersonRolesResponseDto;
import edu.sstu.platform.model.MoviesToPeopleRelation;
import edu.sstu.platform.model.Person;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

@Mapper
public abstract class PersonRolesMapper {

  @Autowired
  @Lazy
  protected MovieMapper movieMapper;

  @Mappings({
      @Mapping(target = "actor", expression = "java(toDto(person.getStarredMovieRelations()))"),
      @Mapping(target = "director", expression = "java(toDto(person.getDirectedMovieRelations()))")
  })
  public abstract PersonRolesResponseDto toDto(Person person);

  public Set<MovieViewResponseDto> toDto(Set<MoviesToPeopleRelation> relations) {
    return relations.stream()
        .map(relation -> movieMapper.toViewDto(relation.getMovie()))
        .sorted(Comparator.comparing(MovieViewResponseDto::getYear))
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }
}
