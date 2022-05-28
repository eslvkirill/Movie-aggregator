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
public class RatedMovieResponseDto extends MovieResponseDto {

  private byte[] poster;
  private Set<GenreResponseDto> genres;
  private Set<PersonViewResponseDto> directors;
}
