package edu.sstu.platform.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@CacheConfig(cacheNames = "countries")
public class CountryService {

  private static final Map<String, String> COUNTRIES_TO_REPLACE = Map.of("Российская Федерация", "Россия");

  private final RestTemplate restClient;
  private final ObjectMapper objectMapper;

  @Value("${app.api.countries}")
  private String countriesApi;

  @SneakyThrows
  @Cacheable
  public Set<String> findCountries() {
    var json = restClient.getForObject(countriesApi, String.class);
    var countryTree = objectMapper.readTree(json);
    Set<String> countries = new TreeSet<>();

    countryTree
        .forEach(countryNode -> countries.add(countryNode.asText().trim()));

    COUNTRIES_TO_REPLACE.forEach((replaceable, replacement) -> {
      if (countries.remove(replaceable)) {
        countries.add(replacement);
      }
    });

    return countries;
  }
}
