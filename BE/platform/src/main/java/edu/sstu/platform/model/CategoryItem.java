package edu.sstu.platform.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CATEGORY_ITEMS")
@IdClass(CategoryItem.IdClass.class)
public class CategoryItem {

  @Id
  @Column(name = "category_id")
  private UUID categoryId;

  @Id
  @Column(name = "movie_id")
  private UUID movieId;

  private LocalDateTime creationDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "movie_id", insertable = false, updatable = false)
  private Movie movie;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", insertable = false, updatable = false)
  private Category category;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class IdClass implements Serializable {

    private UUID categoryId;
    private UUID movieId;
  }
}
