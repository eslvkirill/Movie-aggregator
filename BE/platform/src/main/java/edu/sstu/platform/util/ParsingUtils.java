package edu.sstu.platform.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ParsingUtils {

  public static String findFirstMatching(String regExp, String input) {
    Matcher matcher = Pattern.compile(regExp).matcher(input);

    if (matcher.find()) {
      return matcher.group(matcher.groupCount());
    }

    return Strings.EMPTY;
  }
}
