package edu.sstu.platform.model;

import static java.util.function.Function.identity;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MOVIES")
public class Movie {

  @Id
  @GeneratedValue
  private UUID id;

  private String engTitle;
  private String rusTitle;
  private int year;

  @Lob
  @Basic(fetch = FetchType.LAZY)
  private byte[] poster;

  @Lob
  @Basic(fetch = FetchType.LAZY)
  private byte[] background;

  private String pageColor1;
  private String pageColor2;
  private String tagline;
  private String description;

  @Enumerated(EnumType.STRING)
  private AgeRating ageRating;

  private String trailerUrl;
  private int oscars;
  private boolean active;
  private LocalTime duration;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @ElementCollection(fetch = FetchType.LAZY)
  @CollectionTable(name = "movie_origin_countries",
      joinColumns = @JoinColumn(name = "movie_id"))
  @Column(name = "country_name")
  private Set<String> originCountries = new HashSet<>();

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @ElementCollection
  @CollectionTable(name = "movie_audio",
      joinColumns = @JoinColumn(name = "movie_id"))
  @Enumerated(EnumType.STRING)
  @Column(name = "language")
  private Set<Language> audioLanguages = new HashSet<>();

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @ElementCollection
  @CollectionTable(name = "movie_subtitles",
      joinColumns = @JoinColumn(name = "movie_id"))
  @Enumerated(EnumType.STRING)
  @Column(name = "language")
  private Set<Language> subtitleLanguages = new HashSet<>();

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @ManyToMany
  @JoinTable(name = "movies_to_genres",
      joinColumns = @JoinColumn(name = "movie_id"),
      inverseJoinColumns = @JoinColumn(name = "genre_id"))
  private Set<Genre> genres = new HashSet<>();

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @OneToMany(mappedBy = "id.movie", cascade = CascadeType.ALL)
  private Set<ExternalAggregatorInfo> externalAggregatorInfos = new HashSet<>();

  public void addExternalAggregatorInfo(ExternalAggregatorInfo info) {
    if (externalAggregatorInfos.contains(info)) {
      externalAggregatorInfos.stream()
          .filter(agg -> agg.getAggregator().equals(info.getAggregator()))
          .findFirst()
          .ifPresent(agg -> agg.updateProps(info));
    } else {
      externalAggregatorInfos.add(info);
    }
  }

  public Map<ExternalAggregator, ExternalAggregatorInfo> getExternalAggregatorInfoAsMap() {
    return externalAggregatorInfos.stream()
        .collect(Collectors.toMap(ExternalAggregatorInfo::getAggregator, identity()));
  }
}
