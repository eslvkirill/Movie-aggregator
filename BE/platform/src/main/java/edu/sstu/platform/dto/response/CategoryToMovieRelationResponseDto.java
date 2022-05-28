package edu.sstu.platform.dto.response;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryToMovieRelationResponseDto {

  private UUID categoryId;
  private String categoryName;
  private Boolean contains;
}
