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

  private final Map<String, String> duplicate;
  private final Map<String, String> empty;
  private final Map<String, String> notSupportedOperation;

  public String getDuplicateMessage(String path) {
    return duplicate.get(path);
  }

  public String getEmptyMessage(String type) {
    return empty.get(type);
  }

  public String getNotSupportedOperationMessage(String path) {
    return notSupportedOperation.get(path);
  }
}
