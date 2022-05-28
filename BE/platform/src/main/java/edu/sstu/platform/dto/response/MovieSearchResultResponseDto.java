package edu.sstu.platform.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieSearchResultResponseDto extends MovieResponseDto {

  private byte[] poster;
  private double totalRating;
}
