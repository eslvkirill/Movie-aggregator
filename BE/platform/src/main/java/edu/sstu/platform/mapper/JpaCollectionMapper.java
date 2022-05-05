package edu.sstu.platform.mapper;

import java.util.Collection;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

@Component
public class JpaCollectionMapper {

  public <C extends Collection<T>, T> C map(C source, C target) {
    if (CollectionUtils.isEmpty(source)) {
      return target;
    }
    if (CollectionUtils.isEmpty(target)) {
      return source;
    }

    target.retainAll(source);
    target.addAll(source);

    return target;
  }
}
