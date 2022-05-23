package edu.sstu.platform.model.projection;

import java.util.UUID;

public interface MovieSearchResultMapping {

  UUID getId();

  String getEngTitle();

  String getRusTitle();

  int getYear();

  byte[] getPoster();

  double getTotalRating();
}
