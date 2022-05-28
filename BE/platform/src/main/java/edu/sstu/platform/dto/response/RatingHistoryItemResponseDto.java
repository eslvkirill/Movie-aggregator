package edu.sstu.platform.dto.response;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingHistoryItemResponseDto {

  private RatedMovieResponseDto ratedMovie;
  private double userRating;
  private LocalDate ratingDate;
}
