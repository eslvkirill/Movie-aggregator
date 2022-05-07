package edu.sstu.platform.dto.response;

import edu.sstu.platform.model.RatingType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AverageRatingResponseDto {

  private RatingType ratingType;
  private double averageScore;
}
