package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.MovieRequestDto;
import edu.sstu.platform.dto.response.MovieInfoResponseDto;
import edu.sstu.platform.dto.response.MovieViewResponseDto;
import edu.sstu.platform.model.Movie;
import edu.sstu.platform.model.MoviesToPeopleRelation;
import edu.sstu.platform.model.PersonRole;
import edu.sstu.platform.service.PersonRepo;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = {FileMapper.class, ReviewMapper.class, PersonMapper.class}, imports = {PersonRole.class})
@DecoratedWith(MovieMapperDecorator.class)
public abstract class MovieMapper {

  @Autowired
  protected PersonRepo personRepo;

  @Mappings({
      @Mapping(target = "active", constant = "true"),
      @Mapping(target = "actorRelations",
          expression = "java(toEntity(movieRequestDto.getActors(), movie, PersonRole.ACTOR))"),
      @Mapping(target = "directorRelations",
          expression = "java(toEntity(movieRequestDto.getDirectors(), movie, PersonRole.DIRECTOR))"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "oscars", ignore = true),
      @Mapping(target = "externalAggregatorInfos", ignore = true),
      @Mapping(target = "genres", ignore = true)
  })
  public abstract Movie toEntity(MovieRequestDto movieRequestDto);

  protected Set<MoviesToPeopleRelation> toEntity(Set<UUID> personIds, Movie movie, PersonRole personRole) {
    return personRepo.findAllByIds(personIds).stream()
        .map(person -> MoviesToPeopleRelation.builder()
            .movie(movie)
            .person(person)
            .personRole(personRole)
            .build())
        .collect(Collectors.toSet());
  }

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "active", ignore = true),
      @Mapping(target = "oscars", ignore = true),
      @Mapping(target = "originCountries", ignore = true),
      @Mapping(target = "audioLanguages", ignore = true),
      @Mapping(target = "subtitleLanguages", ignore = true),
      @Mapping(target = "genres", ignore = true),
      @Mapping(target = "externalAggregatorInfos", ignore = true),
      @Mapping(target = "actorRelations", ignore = true),
      @Mapping(target = "directorRelations", ignore = true)
  })
  public abstract void update(MovieRequestDto movieRequestDto, @MappingTarget Movie movie);

  @Mappings({
      @Mapping(target = "externalAggregatorsInfo", source = "externalAggregatorInfos"),
      @Mapping(target = "actors", source = "actorRelations"),
      @Mapping(target = "directors", source = "directorRelations")
  })
  public abstract MovieInfoResponseDto toInfoDto(Movie movie);

  public abstract MovieViewResponseDto toViewDto(Movie movie);

  public abstract List<MovieViewResponseDto> toViewDto(List<Movie> movies);
}
