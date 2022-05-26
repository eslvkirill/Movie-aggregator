package edu.sstu.platform.dto.request;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleManagementRequestDto {

  @NotNull
  private RoleManagementOperation operation;

  @NotNull
  private UserRole role;
}
