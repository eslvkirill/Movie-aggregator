package edu.sstu.platform.model;

import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RATINGS")
public class Rating {

  @Id
  @GeneratedValue
  private UUID id;

  private UUID movieId;
  private UUID userId;

  @Enumerated(EnumType.STRING)
  private RatingType ratingType;

  private float score;
  private int rank;
}
