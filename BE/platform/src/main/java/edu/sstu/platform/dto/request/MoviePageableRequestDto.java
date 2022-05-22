package edu.sstu.platform.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoviePageableRequestDto {

  private int page;
  private int size = 20;
  private MovieSortRequestDto sort;

  public int getOffset() {
    return page * size;
  }
}
