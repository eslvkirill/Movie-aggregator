package edu.sstu.platform.util;

import static edu.sstu.platform.util.QuerydslUtils.preparePath;

import com.querydsl.core.types.Path;
import java.util.function.UnaryOperator;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExceptionUtils {

  public static void addErrorMessageByField(MultiValueMap<String, String> messagesByField, Path<?> path,
      UnaryOperator<String> messageExtractor) {
    var fieldName = preparePath(path);
    messagesByField.add(fieldName, messageExtractor.apply(fieldName));
  }

  public static MultiValueMap<String, String> ofSingleMessage(Path<?> path, UnaryOperator<String> messageExtractor) {
    var messagesByField = new LinkedMultiValueMap<String, String>();
    addErrorMessageByField(messagesByField, path, messageExtractor);

    return messagesByField;
  }
}
