package edu.sstu.platform.mapper;

import edu.sstu.platform.model.Role;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {

  public Set<String> map(Set<Role> roles) {
    return roles.stream()
        .map(role -> role.getRole().name())
        .collect(Collectors.toSet());
  }
}
