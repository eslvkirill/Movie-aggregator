package edu.sstu.platform.mapper;

import static edu.sstu.platform.model.ExternalAggregator.IMDB;
import static edu.sstu.platform.model.ExternalAggregator.KINOPOISK;

import edu.sstu.platform.dto.request.MovieRequestDto;
import edu.sstu.platform.dto.response.MovieEditingResponseDto;
import edu.sstu.platform.model.Movie;
import edu.sstu.platform.model.PersonRole;
import edu.sstu.platform.repo.GenreRepo;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class MovieMapperDecorator extends MovieMapper {

  @Autowired
  private MovieMapper delegate;

  @Autowired
  private JpaCollectionMapper jpaCollectionMapper;

  @Autowired
  private GenreRepo genreRepo;

  @Override
  public Movie toEntity(MovieRequestDto movieRequestDto) {
    var movie = delegate.toEntity(movieRequestDto);
    movie.setGenres(genreRepo.findAllByIds(movieRequestDto.getGenres()));

    return movie;
  }

  @Override
  public void update(MovieRequestDto movieRequestDto, Movie movie) {
    delegate.update(movieRequestDto, movie);
    jpaCollectionMapper.map(movieRequestDto.getOriginCountries(), movie.getOriginCountries());
    jpaCollectionMapper.map(movieRequestDto.getAudioLanguages(), movie.getAudioLanguages());
    jpaCollectionMapper.map(movieRequestDto.getSubtitleLanguages(), movie.getSubtitleLanguages());
    jpaCollectionMapper.map(genreRepo.findAllByIds(movieRequestDto.getGenres()), movie.getGenres());
    jpaCollectionMapper
        .map(toEntity(movieRequestDto.getActors(), movie, PersonRole.ACTOR), movie.getActorRelations());
    jpaCollectionMapper
        .map(toEntity(movieRequestDto.getDirectors(), movie, PersonRole.DIRECTOR), movie.getDirectorRelations());
  }

  @Override
  public MovieEditingResponseDto toEditingDto(Movie movie) {
    var movieEditingResponseDto = delegate.toEditingDto(movie);
    var externalAggregatorInfos = movie.getExternalAggregatorInfoAsMap();
    movieEditingResponseDto.setImdbUrl(externalAggregatorInfos.get(IMDB).getUrl());
    movieEditingResponseDto.setKinopoiskUrl(externalAggregatorInfos.get(KINOPOISK).getUrl());

    return movieEditingResponseDto;
  }
}
