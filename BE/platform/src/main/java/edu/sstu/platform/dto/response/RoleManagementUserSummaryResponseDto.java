package edu.sstu.platform.dto.response;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleManagementUserSummaryResponseDto extends UserResponseDto {

  private String email;
  private String firstName;
  private String lastName;
  private Set<String> roles;
}
