package edu.sstu.platform.dto.request;

import edu.sstu.platform.model.UserRole;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleManagementRequestDto {

  @NotBlank
  @Size(max = 255)
  private String userEmail;

  @NotNull
  private RoleManagementOperation operation;

  @NotNull
  private UserRole role;
}
