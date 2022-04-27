package edu.sstu.platform.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
@Getter
@RequiredArgsConstructor
public class ValidationException extends RuntimeException {

  private final MultiValueMap<String, String> messagesByField;
}
