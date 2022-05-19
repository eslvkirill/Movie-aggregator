package edu.sstu.platform.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Where;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MOVIE_REVIEWS")
public class Review implements Serializable {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(name = "movie_id")
  private UUID movieId;

  @Column(name = "user_id")
  private UUID userId;

  private String title;
  private String body;
  private LocalDateTime creationDate;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "movie_id", insertable = false, updatable = false)
  private Movie movie;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", insertable = false, updatable = false)
  private User user;

  //NOTE: OneToMany relation is used to apply where clause
  @Getter(AccessLevel.NONE)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumns({
      @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false),
      @JoinColumn(name = "movie_id", referencedColumnName = "movie_id", insertable = false, updatable = false),
  })
  @Where(clause = "rating_type = 'TOTAL'")
  private List<Rating> ratings;

  public Rating getRating() {
    return ratings.stream()
        .findFirst()
        .orElse(null);
  }
}
