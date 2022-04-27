package edu.sstu.platform.exception;

import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class AnonymousException extends AuthenticationException {

  public AnonymousException() {
    super("User is not authenticated");
  }
}
