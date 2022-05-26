package edu.sstu.platform.api;

import edu.sstu.platform.dto.response.SearchResultsResponseDto;
import edu.sstu.platform.service.SearchService;
import lombok.RequiredArgsConstructor;
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
  public SearchResultsResponseDto search(@RequestParam String query) {
    return searchService.globalSearch(query);
  }
}
