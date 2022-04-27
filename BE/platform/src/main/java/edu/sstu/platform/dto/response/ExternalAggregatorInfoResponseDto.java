package edu.sstu.platform.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExternalAggregatorInfoResponseDto {

  private String url;
  private float rating;
}
