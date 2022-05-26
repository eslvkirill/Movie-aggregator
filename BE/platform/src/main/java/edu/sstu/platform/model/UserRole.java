package edu.sstu.platform.model;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {

  USER, ADMIN, CRITIC;

  @Override
  public String getAuthority() {
    return "ROLE_" + name();
  }
}
