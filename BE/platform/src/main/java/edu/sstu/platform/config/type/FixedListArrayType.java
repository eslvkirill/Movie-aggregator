package edu.sstu.platform.config.type;

import com.vladmihalcea.hibernate.type.array.ListArrayType;
import java.util.Properties;

public class FixedListArrayType extends ListArrayType {

  @Override
  public void setParameterValues(Properties parameters) {
    if (parameters.containsKey(super.PARAMETER_TYPE)) {
      super.setParameterValues(parameters);
    }
  }
}
