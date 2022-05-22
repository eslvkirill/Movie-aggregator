package edu.sstu.platform.repo.builder;

import edu.sstu.platform.dto.request.SortExpression;
import edu.sstu.platform.dto.request.SortExpressionJoinClause;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.query.criteria.internal.expression.function.AggregationFunction.AVG;
import org.hibernate.query.criteria.internal.expression.function.AggregationFunction.COUNT;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;

@Component
@SuppressWarnings("unchecked")
public class OrderBuilder {

  public Expression<?> buildOrderExpression(SortExpression sortExpression, CriteriaBuilder cb, Root<?> root) {
    Path<?> orderExpression = root;
    if (sortExpression.getRelation() != null) {
      var relation = root.join(sortExpression.getRelation(), JoinType.LEFT);
      var extraJoinPredicates = sortExpression.getExtraJoinClauses()
          .stream()
          .map(joinClause -> processJoinClause(joinClause, cb, root, relation))
          .toArray(Predicate[]::new);
      orderExpression = relation.on(extraJoinPredicates);
    }
    if (sortExpression.getProperty() != null) {
      orderExpression = orderExpression.get(sortExpression.getProperty());
    }
    if (sortExpression.getAggregateFunctionName() != null) {
      Expression<?> aggregatedOrderExpression = applyAggregateFunction(sortExpression.getAggregateFunctionName(),
          cb, (Path<? extends Number>) orderExpression);

      return cb.coalesce(aggregatedOrderExpression, 0);
    }

    return orderExpression;
  }

  private Predicate processJoinClause(SortExpressionJoinClause joinClause, CriteriaBuilder cb,
      Root<?> root, Join<?, ?> relation) {
    if (joinClause.isComparableValueRootColumn()) {
      return cb.equal(relation.get(joinClause.getRelationColumn()),
          root.get((String) joinClause.getComparableValue()));
    }

    return cb.equal(relation.get(joinClause.getRelationColumn()), joinClause.getComparableValue());
  }

  private Expression<?> applyAggregateFunction(String aggFunc, CriteriaBuilder cb,
      Path<? extends Number> expression) {
    switch (aggFunc) {
      case AVG.NAME:
        return cb.avg(expression);
      case COUNT.NAME:
        return cb.count(expression);
      default:
        return expression;
    }
  }

  public Order buildOrder(Expression<?> order, Direction direction, CriteriaBuilder cb) {
    if (direction.isAscending()) {
      return cb.asc(order);
    }

    return cb.desc(order);
  }
}
