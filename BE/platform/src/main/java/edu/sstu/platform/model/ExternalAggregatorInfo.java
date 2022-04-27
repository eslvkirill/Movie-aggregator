package edu.sstu.platform.model;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
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
@Table(name = "EXTERNAL_AGGREGATOR_MOVIE_INFO")
@Entity
public class ExternalAggregatorInfo {

  @EqualsAndHashCode.Include
  @EmbeddedId
  private IdClass id;

  private String url;
  private float rating;

  public ExternalAggregator getAggregator() {
    return id.aggregator;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  @Embeddable
  public static class IdClass implements Serializable {

    @Enumerated(EnumType.STRING)
    private ExternalAggregator aggregator;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;
  }

  public void updateProps(ExternalAggregatorInfo other) {
    this.url = other.url;
    this.rating = other.rating;
  }
}
