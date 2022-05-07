package edu.sstu.platform.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RatingType {

  TOTAL(1),
  SCREENPLAY(2),
  ACTING(3),
  SHOOTING(4),
  DECORATION(5),
  SOUNDTRACK(6),
  SPECIAL_EFFECTS(7),
  ATMOSPHERE(8),
  EMOTIONAL_EFFECT(9);

  private final int rank;
}
