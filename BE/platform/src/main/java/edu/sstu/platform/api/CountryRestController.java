package edu.sstu.platform.api;

import edu.sstu.platform.service.CountryService;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/countries")
public class CountryRestController {

  private final CountryService countryService;

  @GetMapping
  public Set<String> getCountries() {
    return countryService.findCountries();
  }
}
