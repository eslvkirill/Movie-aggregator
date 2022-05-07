package edu.sstu.platform.dto.request;

import edu.sstu.platform.annotation.Step;
import edu.sstu.platform.model.RatingType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRatingRequestDto {

  private RatingType ratingType;

  @Step(0.5F)
  private float score;
}
