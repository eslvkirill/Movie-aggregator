package edu.sstu.platform.service;

import edu.sstu.platform.dto.response.SearchResultsResponseDto;
import edu.sstu.platform.mapper.SearchResultsMapper;
import edu.sstu.platform.model.User;
import edu.sstu.platform.repo.SearchRepo;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

  private final SearchRepo searchRepo;
  private final SearchResultsMapper searchResultsMapper;

  public SearchResultsResponseDto globalSearch(String query) {
    var searchResults = searchRepo.search(prepareUserQuery(query));

    return searchResultsMapper.toDto(searchResults);
  }

  private String prepareUserQuery(String query) {
    var terms = query.split(" ");

    return Arrays.stream(terms)
        .map(term -> String.join("", term, "*"))
        .collect(Collectors.joining(" "));
  }

  public List<User> searchUsers(String query) {
    return searchRepo.searchUsers(prepareUserQuery(query));
  }
}
