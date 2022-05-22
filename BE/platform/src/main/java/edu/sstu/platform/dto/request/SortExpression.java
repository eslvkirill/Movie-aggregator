package edu.sstu.platform.dto.request;

import java.util.List;

public interface SortExpression {

  String getProperty();

  String getRelation();

  List<SortExpressionJoinClause> getExtraJoinClauses();

  String getAggregateFunctionName();
}
