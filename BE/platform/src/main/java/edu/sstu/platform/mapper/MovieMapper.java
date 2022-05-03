package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.MovieRequestDto;
import edu.sstu.platform.dto.response.MovieInfoResponseDto;
import edu.sstu.platform.dto.response.MovieViewResponseDto;
import edu.sstu.platform.model.Movie;
import edu.sstu.platform.repo.GenreRepo;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(uses = {FileMapper.class, GenreRepo.class, ReviewMapper.class})
public interface MovieMapper {

  @Mappings({
      @Mapping(target = "active", constant = "true"),
      @Mapping(target = "genres", qualifiedByName = "findGenresByIds"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "oscars", ignore = true),
      @Mapping(target = "externalAggregatorInfos", ignore = true)
  })
  Movie toEntity(MovieRequestDto movieRequestDto);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "active", ignore = true),
      @Mapping(target = "oscars", ignore = true),
      @Mapping(target = "genres", qualifiedByName = "findGenresByIds"),
      @Mapping(target = "externalAggregatorInfos", ignore = true)
  })
  void update(MovieRequestDto movieRequestDto, @MappingTarget Movie movie);

  @Mapping(target = "externalAggregatorsInfo", source = "externalAggregatorInfos")
  MovieInfoResponseDto toInfoDto(Movie movie);

  MovieViewResponseDto toViewDto(Movie movie);

  List<MovieViewResponseDto> toViewDto(List<Movie> movie);
}
