package edu.sstu.platform.util;

import com.querydsl.core.types.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuerydslUtils {

  public static List<String> toDotPath(Path<?>... paths) {
    return Arrays.stream(paths)
        .map(QuerydslUtils::toDotPath)
        .collect(Collectors.toList());
  }

  public static String toDotPath(Path<?> path) {
    return org.springframework.data.querydsl.QuerydslUtils.toDotPath(path);
  }
}
