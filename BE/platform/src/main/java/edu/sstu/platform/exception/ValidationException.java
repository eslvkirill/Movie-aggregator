package edu.sstu.platform.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.util.MultiValueMap;

@Getter
@RequiredArgsConstructor
public class ValidationException extends RuntimeException {

  private final MultiValueMap<String, String> messagesByField;
}
