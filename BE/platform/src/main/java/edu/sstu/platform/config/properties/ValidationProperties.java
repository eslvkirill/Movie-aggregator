package edu.sstu.platform.config.properties;

import edu.sstu.platform.util.YamlPropertySourceFactory;
import java.util.Map;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ConfigurationProperties("validation")
@PropertySource(value = "classpath:validation.yml", encoding = "UTF-8", factory = YamlPropertySourceFactory.class)
@Data
public class ValidationProperties {

  public static final String FILE_TYPE = "file";

  private final Map<String, String> unique;
  private final Map<String, String> empty;

  public String getNonUniqueMessage(String path) {
    return unique.get(path);
  }

  public String getNonEmptyMessage(String type) {
    return empty.get(type);
  }
}
