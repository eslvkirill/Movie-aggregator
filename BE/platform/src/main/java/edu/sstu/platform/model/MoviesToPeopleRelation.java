package edu.sstu.platform.model;

import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "MOVIES_TO_PEOPLE")
@IdClass(MoviesToPeopleRelation.class)
public class MoviesToPeopleRelation implements Serializable {

  @Id
  @Enumerated(EnumType.STRING)
  @EqualsAndHashCode.Include
  private PersonRole personRole;

  @Id
  @ToString.Exclude
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "movie_id", insertable = false, updatable = false)
  private Movie movie;

  @Id
  @ToString.Exclude
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "person_id", insertable = false, updatable = false)
  private Person person;

  @EqualsAndHashCode.Include
  public UUID getPersonId() {
    return person.getId();
  }

  @EqualsAndHashCode.Include
  public UUID getMovieId() {
    return movie.getId();
  }
}
