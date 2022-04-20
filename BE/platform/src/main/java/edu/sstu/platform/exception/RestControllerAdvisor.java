package edu.sstu.platform.exception;

import java.util.Date;
import java.util.Map;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestControllerAdvisor {

  @ExceptionHandler(EntityNotFoundException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, Object> handleEntityNotFoundException(EntityNotFoundException e) {
    return Map.of("message", e.getMessage(), "timestamp", new Date());
  }
}
