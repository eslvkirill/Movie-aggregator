package edu.sstu.platform.exception;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@SuppressWarnings("NullableProblems")
public class RestControllerAdvisor extends ResponseEntityExceptionHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public Map<String, Object> handleEntityNotFoundException(EntityNotFoundException e) {
    return defaultExceptionHandling(e);
  }

  private Map<String, Object> defaultExceptionHandling(Exception e) {
    return defaultExceptionHandling(e.getMessage());
  }

  private Map<String, Object> defaultExceptionHandling(String message) {
    Map<String, Object> response = new HashMap<>();
    response.put("message", message);
    response.put("timestamp", new Date());

    return response;
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    return prepareFailedValidationResponse(ex, headers);
  }

  @Override
  protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers,
      HttpStatus status, WebRequest request) {
    return prepareFailedValidationResponse(ex, headers);
  }

  private ResponseEntity<Object> prepareFailedValidationResponse(BindException ex, HttpHeaders headers) {
    MultiValueMap<String, String> errorMessageByFieldName = new LinkedMultiValueMap<>();

    ex.getFieldErrors()
        .forEach(fieldError -> errorMessageByFieldName.add(fieldError.getField(), fieldError.getDefaultMessage()));

    return ResponseEntity.badRequest()
        .headers(headers)
        .body(Map.of("errors", errorMessageByFieldName));
  }

  @ExceptionHandler(ValidationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, Object> handleValidationException(ValidationException e) {
    return Map.of("errors", e.getMessagesByField());
  }

  @ExceptionHandler(AuthenticationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, Object> handleValidationException(AuthenticationException e) {
    return defaultExceptionHandling(e);
  }

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, Object> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
    return defaultExceptionHandling(e.getMostSpecificCause().getMessage());
  }
}
