package edu.sstu.platform.util;

import com.querydsl.core.types.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuerydslUtils {

  public static List<String> preparePaths(Path<?>... paths) {
    return Arrays.stream(paths)
        .map(path -> path.getMetadata().getName())
        .collect(Collectors.toList());
  }

  public static String preparePath(Path<?> path) {
    return path.getMetadata().getName();
  }
}
