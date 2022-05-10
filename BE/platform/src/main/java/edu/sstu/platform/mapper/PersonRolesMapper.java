package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.response.MovieViewResponseDto;
import edu.sstu.platform.dto.response.PersonRolesResponseDto;
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
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

@Mapper
public abstract class PersonRolesMapper {

  @Lazy
  @Autowired
  protected MovieMapper movieMapper;

  @Mappings({
      @Mapping(target = "actor",
          expression = "java(toDto(person.getStarredMovieRelations(), ratingsByMovieId))"),
      @Mapping(target = "director",
          expression = "java(toDto(person.getDirectedMovieRelations(), ratingsByMovieId))")
  })
  public abstract PersonRolesResponseDto toDto(Person person, Map<UUID, List<RatingMapping>> ratingsByMovieId);

  public Set<MovieViewResponseDto> toDto(Set<MoviesToPeopleRelation> relations,
      Map<UUID, List<RatingMapping>> ratingsByMovieId) {
    return relations.stream()
        .map(relation -> movieMapper.toViewDto(relation.getMovie(), ratingsByMovieId))
        .sorted(Comparator.comparing(MovieViewResponseDto::getYear))
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }
}
