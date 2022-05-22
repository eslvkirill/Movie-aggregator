package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.MovieRequestDto;
import edu.sstu.platform.dto.response.MovieInfoResponseDto;
import edu.sstu.platform.dto.response.MovieViewResponseDto;
import edu.sstu.platform.model.Movie;
import edu.sstu.platform.model.MoviesToPeopleRelation;
import edu.sstu.platform.model.PersonRole;
import edu.sstu.platform.model.Rating;
import edu.sstu.platform.model.projection.RatingMapping;
import edu.sstu.platform.repo.PersonRepo;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(uses = {FileMapper.class, ReviewMapper.class, PersonMapper.class, RatingMapper.class},
    imports = {PersonRole.class, LocalDateTime.class})
@DecoratedWith(MovieMapperDecorator.class)
public abstract class MovieMapper {

  @Autowired
  protected PersonRepo personRepo;

  @Mappings({
      @Mapping(target = "active", constant = "true"),
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())"),
      @Mapping(target = "actorRelations",
          expression = "java(toEntity(movieRequestDto.getActors(), movie, PersonRole.ACTOR))"),
      @Mapping(target = "directorRelations",
          expression = "java(toEntity(movieRequestDto.getDirectors(), movie, PersonRole.DIRECTOR))"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "oscars", ignore = true),
      @Mapping(target = "externalAggregatorInfos", ignore = true),
      @Mapping(target = "genres", ignore = true),
      @Mapping(target = "ratings", ignore = true)
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
      @Mapping(target = "directorRelations", ignore = true),
      @Mapping(target = "creationDate", ignore = true),
      @Mapping(target = "ratings", ignore = true)
  })
  public abstract void update(MovieRequestDto movieRequestDto, @MappingTarget Movie movie);

  @Mappings({
      @Mapping(target = "externalAggregatorsInfo", source = "movie.externalAggregatorInfos"),
      @Mapping(target = "actors", source = "movie.actorRelations"),
      @Mapping(target = "directors", source = "movie.directorRelations"),
      @Mapping(target = "totalRating", ignore = true)
  })
  public abstract MovieInfoResponseDto toInfoDto(Movie movie, List<RatingMapping> averageRatings,
      List<Rating> userRatings);

  @Mappings({
      @Mapping(target = "directors", source = "movie.directorRelations"),
      @Mapping(target = "totalRating",
          expression = "java(extractAverageTotalRating(movie, ratingsByMovieId))")
  })
  public abstract MovieViewResponseDto toViewDto(Movie movie, Map<UUID, List<RatingMapping>> ratingsByMovieId);

  public List<MovieViewResponseDto> toViewDto(List<Movie> movies, Map<UUID, List<RatingMapping>> ratingsByMovieId) {
    return movies.stream()
        .map(movie -> toViewDto(movie, ratingsByMovieId))
        .collect(Collectors.toList());
  }

  protected double extractAverageTotalRating(Movie movie, Map<UUID, List<RatingMapping>> ratingsByMovieId) {
    return Optional.ofNullable(ratingsByMovieId.get(movie.getId()))
        .map(rating -> rating.get(0).getAverageScore())
        .orElse(0.0);
  }
}
