package edu.sstu.platform.model;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Language {

  RUSSIAN("Русский"),
  ENGLISH("Английский"),
  FRENCH("Французский"),
  ITALIAN("Итальянский"),
  GERMAN("Немецкий"),
  KOREAN("Корейский"),
  SPANISH("Испанский");

  @JsonValue
  private final String name;

  public static Language of(String name) {
    return Arrays.stream(values())
        .filter(language -> language.name.equals(name))
        .findFirst()
        .orElseThrow();
  }
}
