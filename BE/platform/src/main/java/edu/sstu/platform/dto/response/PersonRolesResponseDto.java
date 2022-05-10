package edu.sstu.platform.dto.response;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonRolesResponseDto {

  private Set<MovieViewResponseDto> actor;
  private Set<MovieViewResponseDto> director;
}
