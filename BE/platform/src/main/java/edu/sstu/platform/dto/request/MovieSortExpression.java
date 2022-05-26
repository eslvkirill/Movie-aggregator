package edu.sstu.platform.dto.request;

import static edu.sstu.platform.dto.request.SortExpressionJoinClause.of;
import static edu.sstu.platform.model.Movie_.RATINGS;
import static edu.sstu.platform.model.Rating_.ID;
import static edu.sstu.platform.model.Rating_.SCORE;

import edu.sstu.platform.model.RatingType;
import edu.sstu.platform.model.Rating_;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.criteria.internal.expression.function.AggregationFunction.AVG;
import org.hibernate.query.criteria.internal.expression.function.AggregationFunction.COUNT;

@Getter
@RequiredArgsConstructor
public enum MovieSortExpression implements SortExpression {

  TOTAL_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.TOTAL, false)), AVG.NAME),
  SCREENPLAY_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.SCREENPLAY, false)), AVG.NAME),
  ACTING_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.ACTING, false)), AVG.NAME),
  SHOOTING_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.SHOOTING, false)), AVG.NAME),
  DECORATION_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.DECORATION, false)), AVG.NAME),
  SOUNDTRACK_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.SOUNDTRACK, false)), AVG.NAME),
  SPECIAL_EFFECTS_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.SPECIAL_EFFECTS, false)), AVG.NAME),
  ATMOSPHERE_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.ATMOSPHERE, false)), AVG.NAME),
  EMOTIONAL_EFFECT_RATING(SCORE, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.EMOTIONAL_EFFECT, false)), AVG.NAME),
  POPULARITY(ID, RATINGS, List.of(of(Rating_.RATING_TYPE, RatingType.TOTAL, false)), COUNT.NAME);

  private final String property;
  private final String relation;
  private final List<SortExpressionJoinClause> extraJoinClauses;
  private final String aggregateFunctionName;

  public static Optional<MovieSortExpression> findByName(String name) {
    return Arrays.stream(values())
        .filter(n -> n.name().equals(name))
        .findFirst();
  }
}
