package edu.sstu.platform.model.projection;

import edu.sstu.platform.model.RatingType;
import java.util.UUID;

public interface RatingMapping {

  UUID getMovieId();

  RatingType getRatingType();

  double getAverageScore();
}
