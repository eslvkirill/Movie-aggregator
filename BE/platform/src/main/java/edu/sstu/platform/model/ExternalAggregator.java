package edu.sstu.platform.model;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExternalAggregator {

  KINOPOISK("Kinopoisk"),
  IMDB("Internet Movie Database"),
  METACRITIC("Metacritic");

  private final String name;

  public static ExternalAggregator of(String name) {
    return Arrays.stream(values())
        .filter(source -> source.name.equals(name))
        .findFirst()
        .orElse(null);
  }
}
