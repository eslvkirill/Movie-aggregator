package edu.sstu.platform.model;

import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Column;
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
public class Rating implements Serializable {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(name = "movie_id")
  private UUID movieId;

  @Column(name = "user_id")
  private UUID userId;

  @Enumerated(EnumType.STRING)
  private RatingType ratingType;

  private float score;
  private int rank;
}
