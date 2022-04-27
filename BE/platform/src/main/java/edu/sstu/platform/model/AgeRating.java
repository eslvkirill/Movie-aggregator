package edu.sstu.platform.model;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AgeRating {

  PG13("12+"), R("16+"), NC17("18+");

  @JsonValue
  private final String russianEquivalent;

  public static AgeRating of(String russianEquivalent) {
    return Arrays.stream(values())
        .filter(ageRating -> ageRating.russianEquivalent.equals(russianEquivalent))
        .findFirst()
        .orElseThrow();
  }
}
