package edu.sstu.platform.dto.request;

import static edu.sstu.platform.dto.request.MovieSortExpression.TOTAL_RATING;

import java.util.Arrays;
import lombok.Data;
import org.springframework.data.domain.Sort.Direction;

@Data
public class MovieSortRequestDto {

  private MovieSortExpression expression;
  private Direction direction;

  public MovieSortRequestDto(String sort) {
    var sortIterator = Arrays.stream(sort.split(",")).iterator();

    if (sortIterator.hasNext()) {
      var next = sortIterator.next();

      MovieSortExpression.findByName(next)
          .ifPresentOrElse(expression -> this.expression = expression,
              () -> this.direction = Direction.valueOf(next));
    }
    if (sortIterator.hasNext()) {
      this.direction = Direction.valueOf(sortIterator.next());
    }
    if (expression == null) {
      this.expression = TOTAL_RATING;
    }
    if (direction == null) {
      this.direction = Direction.ASC;
    }
  }
}
