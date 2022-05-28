package edu.sstu.platform.model.projection;

import java.util.UUID;

public interface CategoryToMovieRelationMapping {

  UUID getCategoryId();

  String getCategoryName();

  Boolean getContains();
}
