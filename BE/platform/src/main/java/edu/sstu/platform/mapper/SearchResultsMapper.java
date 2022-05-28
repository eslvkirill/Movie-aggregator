package edu.sstu.platform.mapper;

import static edu.sstu.platform.repo.SearchRepo.SearchCriteria.MOVIE;

import edu.sstu.platform.dto.response.SearchResultsResponseDto;
import edu.sstu.platform.dto.response.UserSearchBasicResultResponseDto;
import edu.sstu.platform.model.User;
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
  
  @Autowired
  protected UserMapper userMapper;

  public SearchResultsResponseDto toDto(Map<SearchCriteria, List<?>> searchResults) {
    return SearchResultsResponseDto.builder()
        .movies(movieMapper.toSearchResultDto((List<MovieSearchResultMapping>) searchResults.get(MOVIE)))
        .build();
  }

  public List<UserSearchBasicResultResponseDto> toUserSearchBasicResultDto(List<User> users) {
    return userMapper.toSearchBasicResultDto(users);
  }
}
