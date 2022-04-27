package edu.sstu.platform.converter;

import edu.sstu.platform.model.AgeRating;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class StringToAgeRatingEnumConverter implements Converter<String, AgeRating> {

  @Override
  public AgeRating convert(@NonNull String russianEquivalent) {
    return AgeRating.of(russianEquivalent);
  }
}
