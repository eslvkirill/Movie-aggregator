package edu.sstu.platform.converter;

import edu.sstu.platform.model.Language;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class StringToLanguageEnumConverter implements Converter<String, Language> {

  @Override
  public Language convert(@NonNull String name) {
    return Language.of(name);
  }
}
