package edu.sstu.platform.dto.response;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonRolesResponseDto {

  private Set<PersonMovieResponseDto> actor;
  private Set<PersonMovieResponseDto> director;
}
