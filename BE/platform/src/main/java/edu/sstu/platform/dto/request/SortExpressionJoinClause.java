package edu.sstu.platform.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SortExpressionJoinClause {

  private String relationColumn;
  private Object comparableValue;
  private boolean isComparableValueRootColumn;

  public static SortExpressionJoinClause of(String relationColumn, Object comparableValue,
      boolean isComparableValueRootColumn) {
    return SortExpressionJoinClause.builder()
        .relationColumn(relationColumn)
        .comparableValue(comparableValue)
        .isComparableValueRootColumn(isComparableValueRootColumn)
        .build();
  }
}
