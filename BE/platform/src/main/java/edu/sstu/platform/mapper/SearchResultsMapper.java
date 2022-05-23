package edu.sstu.platform.mapper;

import static edu.sstu.platform.repo.SearchRepo.SearchCriteria.MOVIE;

import edu.sstu.platform.dto.response.SearchResultsResponseDto;
import edu.sstu.platform.model.projection.MovieSearchResultMapping;
import edu.sstu.platform.repo.SearchRepo.SearchCriteria;
import java.util.List;
import java.util.Map;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper
@SuppressWarnings("unchecked")
public abstract class SearchResultsMapper {

  @Autowired
  protected MovieMapper movieMapper;

  public SearchResultsResponseDto toDto(Map<SearchCriteria, List<?>> searchResults) {
    return SearchResultsResponseDto.builder()
        .movies(movieMapper.toSearchResultDto((List<MovieSearchResultMapping>) searchResults.get(MOVIE)))
        .build();
  }
}
