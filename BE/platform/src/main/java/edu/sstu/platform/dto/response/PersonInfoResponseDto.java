package edu.sstu.platform.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonInfoResponseDto extends PersonResponseDto {

  private byte[] image;
  private String biography;
  private PersonRolesResponseDto roles;
}
