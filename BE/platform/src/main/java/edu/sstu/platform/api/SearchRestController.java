package edu.sstu.platform.api;

import edu.sstu.platform.dto.response.SearchResultsResponseDto;
import edu.sstu.platform.dto.response.UserSearchBasicResultResponseDto;
import edu.sstu.platform.service.SearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/search")
public class SearchRestController {

  private final SearchService searchService;

  @GetMapping
  public SearchResultsResponseDto globalSearch(@RequestParam String query) {
    return searchService.globalSearch(query);
  }

  @GetMapping("/users")
  @PreAuthorize("hasRole('ADMIN')")
  public List<UserSearchBasicResultResponseDto> searchUsers(@RequestParam String query) {
    return searchService.searchUsers(query);
  }
}
