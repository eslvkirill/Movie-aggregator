package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.response.PersonMovieResponseDto;
import edu.sstu.platform.dto.response.PersonRolesResponseDto;
import edu.sstu.platform.model.Movie;
import edu.sstu.platform.model.MoviesToPeopleRelation;
import edu.sstu.platform.model.Person;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public interface PersonRolesMapper {

  @Mappings({
      @Mapping(target = "actor", expression = "java(toDto(person.getStarredMovieRelations()))"),
      @Mapping(target = "director", expression = "java(toDto(person.getDirectedMovieRelations()))")
  })
  PersonRolesResponseDto toDto(Person person);

  PersonMovieResponseDto toDto(Movie movie);

  default Set<PersonMovieResponseDto> toDto(Set<MoviesToPeopleRelation> relations) {
    return relations.stream()
        .map(MoviesToPeopleRelation::getMovie)
        .sorted(Comparator.comparing(Movie::getYear))
        .map(this::toDto)
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }
}
