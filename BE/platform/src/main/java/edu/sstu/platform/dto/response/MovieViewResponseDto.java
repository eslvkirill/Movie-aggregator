package edu.sstu.platform.dto.response;

import java.time.LocalTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieViewResponseDto extends MovieResponseDto {

  private byte[] poster;
  private String pageColor1;
  private Set<GenreResponseDto> genres;
  private LocalTime duration;
}
