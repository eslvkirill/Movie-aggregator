package edu.sstu.platform.model;

import static java.lang.String.join;

import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Where;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PEOPLE")
public class Person {

  @Id
  @GeneratedValue
  private UUID id;

  private String firstName;
  private String lastName;

  @Lob
  private byte[] image;

  private String biography;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
  @Where(clause = "person_role = 'ACTOR'")
  private Set<MoviesToPeopleRelation> starredMovieRelations;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
  @Where(clause = "person_role = 'DIRECTOR'")
  private Set<MoviesToPeopleRelation> directedMovieRelations;

  public String getFullName() {
    return join(" ", firstName, lastName);
  }
}
