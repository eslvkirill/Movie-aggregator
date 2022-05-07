package edu.sstu.platform.dto.request;

import edu.sstu.platform.annotation.Step;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRatingRequestDto {

  @Step(0.5F)
  private float score;
}
