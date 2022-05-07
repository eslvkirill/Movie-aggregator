package edu.sstu.platform.dto.response;

import edu.sstu.platform.model.RatingType;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingResponseDto {

  private UUID id;
  private RatingType ratingType;
  private float score;
}
